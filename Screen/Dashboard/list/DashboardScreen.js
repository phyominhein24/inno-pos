import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useDispatch, useSelector } from 'react-redux';
import { invoiceService } from '../../Invoice/invoiceService';

const DashboardScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const { invoices } = useSelector((state) => state.invoice);
    const [date, setDate] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const onChange = (event, selectedDate) => {
        setShowPicker(false);
        if (selectedDate) {
            setDate(selectedDate);
            loadingData(selectedDate);
        }
    };

    const loadingData = useCallback(async (selectedDate) => {
        setIsLoading(true);
        try {
            const formattedDate = format(selectedDate || date, 'yyyy-MM-dd');
            await invoiceService.index(dispatch, { start_date: formattedDate, end_date: formattedDate });
        } catch (error) {
            alert("An error occurred while fetching data.");
        }
        setIsLoading(false);
    }, [dispatch, date]);

    useEffect(() => {
        loadingData(date);
    }, [loadingData]);

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
                <Text style={styles.summaryDate}>{format(date, 'dd/MM/yyyy')}</Text>
                <Text style={styles.summaryAmount}>450,000,000</Text>
                <Text style={styles.summarySubtitle}>Total Balance (Ks)</Text>
            </View>

            {/* Date Filter */}
            <View style={styles.todayContainer}>
                <Text style={styles.todayText}>Select Date</Text>
                <TouchableOpacity onPress={() => setShowPicker(true)}>
                    <Ionicons name="calendar" size={20} color="#333" />
                </TouchableOpacity>
            </View>

            {showPicker && (
                <DateTimePicker value={date} mode="date" display="default" onChange={onChange} />
            )}

            {/* Loading Indicator */}
            {isLoading ? (
                <ActivityIndicator size="large" color="#C69C6D" style={styles.loader} />
            ) : (
                <FlatList
                    data={invoices}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.invoiceItem}>
                            <Ionicons name="receipt" size={24} color="#000" style={styles.icon} />
                            <View style={styles.invoiceDetails}>
                                <Text style={styles.invoiceId}>{item.iv_number}</Text>
                                <Text style={styles.invoiceDate}>{item.created_at}</Text>
                            </View>
                            <Text style={styles.invoiceAmount}>+{item.total_amount}.00</Text>
                        </TouchableOpacity>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F4F4',
        padding: 10,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        backgroundColor: '#fff',
        marginBottom: 10,
        elevation: 3,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    salesSummary: {
        backgroundColor: '#C69C6D',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    summaryTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    summaryDate: {
        color: '#EEE',
        fontSize: 14,
        position: 'absolute',
        right: 20,
        top: 10,
    },
    summaryAmount: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
    },
    summarySubtitle: {
        color: '#fff',
        fontSize: 14,
    },
    todayContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    todayText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    invoiceItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginVertical: 5,
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
        fontWeight: 'bold',
    },
    invoiceDate: {
        fontSize: 14,
        color: '#666',
    },
    invoiceAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#00A86B',
    },
    loader: {
        marginTop: 20,
        alignSelf: 'center',
    },
});

export default DashboardScreen;
