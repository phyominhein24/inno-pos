import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import Constants from "expo-constants";
import { useDispatch, useSelector } from "react-redux";
import { invoiceService } from "../invoiceService";

const InvoiceListScreen = ({ navigation }) => {

  const dispatch = useDispatch();
  const [ isLoading, setIsLoading ] = useState(false)
  const { invoices, paginateParams } = useSelector((state) => state.invoice);
  const [search, setSearch] = useState("");
  // const [invoices] = useState(
  //   Array(5).fill({
  //     id: "9340438434934",
  //     date: "01/03/2025 12:00:30 PM",
  //     amount: 138500.0,
  //   })
  // );

  const loadingData = useCallback(async () => {
    try {
      await invoiceService.index(dispatch, paginateParams);
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>History</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={30} color="#ccc" />
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      <TextInput
        style={styles.searchBar}
        placeholder="Search Invoice"
        value={search}
        onChangeText={setSearch}
      />

      {/* Invoice List */}
      <FlatList
        data={invoices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.invoiceCard}>
            <Text style={styles.sectionTitle}>TODAY</Text>
            <Text style={styles.totalBalanceLabel}>Total Balance (Ks)</Text>
            <Text style={styles.totalBalance}>150,000,000.00</Text>
            <TouchableOpacity style={styles.invoiceItem}>
              <Ionicons name="document-text" size={24} color="#000" />
              <View style={styles.invoiceDetails}>
                <Text style={styles.invoiceId}>{item.iv_number}</Text>
                <Text style={styles.invoiceDate}>{item.created_at}</Text>
              </View>
              <Text style={styles.total_amount}>.00
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    // padding: 10,
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
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  invoiceCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  totalBalanceLabel: {
    fontSize: 14,
    color: "#666",
  },
  totalBalance: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  invoiceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  invoiceDetails: {
    flex: 1,
    marginLeft: 10,
  },
  invoiceId: {
    fontSize: 16,
    fontWeight: "bold",
  },
  invoiceDate: {
    fontSize: 14,
    color: "#666",
  },
  invoiceAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00A86B",
  },
});

export default InvoiceListScreen;
