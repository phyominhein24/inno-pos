import React, { useState, useEffect, useCallback } from 'react';
import { Image, View, Text, FlatList, TouchableOpacity, StyleSheet, Modal, Button, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { categoryService } from '../categoryService';
import { useDispatch, useSelector } from 'react-redux';
import ConfirmAlert from '../../../shares/ConfirmAlert';
import TableSearch from '../../../shares/TableSearch';
import { setPaginate } from '../categorySlice';

const CategoryListScreen = ({ navigation, route }) => {

  const { categorys, paginateParams } = useSelector((state) => state.category);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true)
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [hasMore, setHasMore] = useState(true);  // Flag to check if there is more data to load

  const dispatch = useDispatch();

  const deleteItem = async () => {
    setIsLoading(true);
    const result = await categoryService.destory(dispatch, selectedItem?.id);
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
      const result = await categoryService.index(dispatch, paginateParams);
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

    const result = await categoryService.index(dispatch, { ...paginateParams, page: nextPage });
    if (result.status === 200 && result.data.categorys.length < paginateParams.per_page) {
      setHasMore(false);
    }
  };

  return (
    <View style={styles.container}>

      <TableSearch paginateParams={paginateParams} onSearchChange={onSearchChange} />

      <FlatList
        data={categorys}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <View style={styles.item}>
              <Text style={styles.itemText}>{item?.id}</Text>
              <Text style={styles.itemText}>{item?.name}</Text>
              <Text style={styles.itemText}>{item?.description}</Text>
              <Text style={styles.itemText}>{item?.status}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('CategoryUpdate', { data: item })}>
                <Ionicons name="pencil" size={24} color="blue" style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setSelectedItem(item); setModalVisible(true); }}>
                <Ionicons name="trash" size={24} color="red" style={styles.icon} />
              </TouchableOpacity>
            </View>
          </View>
        )}
        // onEndReached={handleEndReached}  // Triggered when category reaches the bottom
        // onEndReachedThreshold={0.5}  // When category is 50% from the bottom, trigger fetch
        // ListFooterComponent={isLoading ? <ActivityIndicator size="large" /> : null}  // Loading indicator at bottom
      />

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('CategoryCreate')}>
        <Ionicons name="add-circle" size={50} color="green" />
      </TouchableOpacity>

      <ConfirmAlert 
        visible={modalVisible} 
        onCancel={() => setModalVisible(false)} 
        onConfirm={() => deleteItem()} 
        item={selectedItem} 
      />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  }
});

export default CategoryListScreen;
