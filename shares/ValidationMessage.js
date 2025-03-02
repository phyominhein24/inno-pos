import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

export const ValidationMessage = ({ field }) => {
  const state = useSelector((state) => state.share);
  const { errors } = state;

  return (
    <>
      {errors && errors[field] && (
        <Text style={styles.errorText}>
          {errors[field][0]}
        </Text>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
});

export default ValidationMessage;
