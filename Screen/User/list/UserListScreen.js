import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { userService } from '../userService'; 
import { userPayload } from '../userPayload';  

const CustomerListScreen = ({ navigation }) => {
  const { users, paginateParams } = useSelector((state) => state.user);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);  // Flag to check if there is more data to load

  const dispatch = useDispatch();

  const deleteItem = async () => {
    setIsLoading(true);
    const result = await userService.destory(dispatch, selectedItem?.id);
    if (result.status == 204) {
        loadingData();
        setIsLoading(false);
    } else {
        setIsLoading(false);
    }
    setModalVisible(false);
  };

  const onSearchChange = (event) => {
    dispatch(
        setPaginate({
            ...paginateParams,
            search: event,
        })
    );
  };

  const loadingData = useCallback(async () => {
    try {
      const result = await userService.index(dispatch, paginateParams);
      if (result.status === 200) {
        setTotal(result.data.total);
      }
      setIsLoading(false);
    } catch (error) {
      alert("An error occurred while fetching data.");
      setIsLoading(false);
    }
  }, [dispatch, paginateParams]);

  useEffect(() => {
      setIsLoading(true);
      loadingData();
  }, [loadingData]);

  const handleEndReached = async () => {
    if (isLoading || !hasMore) return;

    const nextPage = paginateParams.page + 1;
    dispatch(setPaginate({
      ...paginateParams,
      page: nextPage
    }));

    const result = await userService.index(dispatch, { ...paginateParams, page: nextPage });
    if (result.status === 200 && result.data.users.length < paginateParams.per_page) {
      setHasMore(false);
    }
  };


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Customer</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Search Customer" />

      {/* Create Button */}
      <View style={styles.createContainer}>
        <Text style={styles.customerListTitle}>CUSTOMER LIST</Text>
        <TouchableOpacity onPress={() => navigation.navigate("UserCreate")}>
          <Text style={styles.createButton}>Create +</Text>
        </TouchableOpacity>
      </View>

      {/* Customer List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.customerItem}
            onPress={() => navigation.navigate("UserUpdate", { data: item })} // Navigate to UserUpdateScreen
          >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="black"
              style={styles.avatar}
            />
            <View>
              <Text style={styles.customerName}>{item.name}</Text>
              <Text style={styles.customerEmail}>{item.email}</Text>
              <Text style={styles.customerPhone}>{item.phone}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    // paddingHorizontal: 10,
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  searchBar: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  createContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,

  },
  customerListTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  createButton: {
    fontSize: 14,
    color: "blue",
  },
  customerItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,

  },
  avatar: {
    marginRight: 15,
  },
  customerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  customerEmail: {
    fontSize: 14,
    color: "#666",
  },
  customerPhone: {
    fontSize: 14,
    color: "#666",
  },
});

export default CustomerListScreen;
