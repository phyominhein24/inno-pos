import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { format } from "date-fns";
import DateTimePicker from "@react-native-community/datetimepicker";
import  Constants  from "expo-constants";

const DashboardScreen = ({ navigation }) => {
  const [invoices] = useState(
    Array(10).fill({
      id: "9340438434934",
      date: "01/03/2025 12:00:30 PM",
      amount: 138500.0,
    })
  );
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={24} color="gray" />
        </TouchableOpacity>
      </View>

      {/* Sales Summary */}
      <View style={styles.salesSummary}>
        <Text style={styles.summaryTitle}>Today Sale Amount</Text>
        <Text style={styles.summaryDate}>{format(date, "dd/MM/yyyy")}</Text>
        <Text style={styles.summaryAmount}>450,000,000</Text>
        <Text style={styles.summarySubtitle}>Total Balance (Ks)</Text>
      </View>

      {/* Today Section */}
      <View style={styles.todayContainer}>
        <Text style={styles.todayText}>TODAY</Text>
        <TouchableOpacity onPress={() => setShowPicker(true)}>
          <Ionicons name="filter" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}

      {/* Invoice List */}
      <FlatList
        data={invoices}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.invoiceItem}>
            <Ionicons
              name="receipt"
              size={24}
              color="#000"
              style={styles.icon}
            />
            <View style={styles.invoiceDetails}>
              <Text style={styles.invoiceId}>{item.id}</Text>
              <Text style={styles.invoiceDate}>{item.date}</Text>
            </View>
            <Text style={styles.invoiceAmount}>
              +{item.amount.toLocaleString()}.00
            </Text>
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
    marginTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  headerContainer: {
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
  salesSummary: {
    backgroundColor: "#C69C6D",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
    marginHorizontal: 10,

  },
  summaryTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  summaryDate: {
    color: "#EEE",
    fontSize: 14,
    position: "absolute",
    right: 20,
    top: 10,
  },
  summaryAmount: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
  },
  summarySubtitle: {
    color: "#fff",
    fontSize: 14,
  },
  todayContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 5,
    marginHorizontal: 10,

  },
  todayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  invoiceItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    elevation: 2,
  },
  icon: {
    marginRight: 15,
  },
  invoiceDetails: {
    flex: 1,
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

export default DashboardScreen;
