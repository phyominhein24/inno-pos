import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TableSearch = ({ paginateParams, onSearchChange }) => {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [value, setValue] = useState(paginateParams.search)
  const [typingTimeout, setTypingTimeout] = useState(null);

  const searchChange = (text) => {
    setValue(text);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeout = setTimeout(() => {
      onSearchChange(text);
      console.log(text)
    }, 500);

    setTypingTimeout(timeout);
  };

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
        <Ionicons name={isSearchVisible ? 'close' : 'search'} size={30} color="black" />
      </TouchableOpacity>
      {isSearchVisible && (
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name or email..."
          value={value}
          onChangeText={searchChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    paddingBottom: 4,
  },
});

export default TableSearch;
