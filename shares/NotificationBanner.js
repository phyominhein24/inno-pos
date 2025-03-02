import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { removeNotification } from './shareSlice';
import { Ionicons } from '@expo/vector-icons';  // Importing Ionicons for the dismiss icon

const NotificationBanner = () => {
  const { notification } = useSelector((state) => state.share);
  const dispatch = useDispatch();

  
  useEffect(() => {
    const timeoutId = setTimeout(() => {
        notification.forEach((noti) => {
            if (noti?.time !== 'dissable') {
                dispatch(removeNotification(noti.id));
            }
        });
    }, 5000);

    return () => clearTimeout(timeoutId);
  }, [notification]);

  return (
    <View style={styles.notificationContainer}>
      {notification?.map((v, i) => (
        <View key={i} style={styles.notificationBar}>
          <Text style={styles.notificationText}>{v?.message}</Text>
          <TouchableOpacity 
            onPress={() => dispatch(removeNotification(v?.id))}
            style={styles.dismissButton}
          >
            <Ionicons name="close-circle" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 50,  // Lower it slightly so it doesn’t overlap the header
    right: 10,  // Move to the right
    zIndex: 9999,  // Ensure it's above other UI elements
    pointerEvents: 'box-none',  // Allow touches to pass through
  },
  notificationBar: {
    backgroundColor: '#007bff',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    opacity: 0.85,
    width: 250,  // Adjust width for a cleaner look
    alignSelf: 'flex-end',  // Align to the right
    elevation: 4,
  },
  notificationText: {
    color: '#fff',
    fontSize: 14,
    flex: 1,
  },
  dismissButton: {
    padding: 5,
  },
});

export default NotificationBanner;
