import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { BluetoothEscposPrinter, BluetoothManager } from "react-native-thermal-receipt-printer-image-qr";

const VoucherPrintScreen = () => {
    const [pairedDevices, setPairedDevices] = useState([]);

    // useEffect(() => {
    //     // Enable Bluetooth
    //     BluetoothManager.enableBluetooth().then(devices => {
    //         setPairedDevices(devices);
    //     }).catch(err => console.log("Bluetooth Error:", err));
    // }, []);

    // Print Voucher
    const printVoucher = async () => {
        console.log("printVoucher");
        
        // try {
        //     await BluetoothEscposPrinter.printText("\n===== VOUCHER =====\n", {
        //         encoding: 'GBK',
        //         codepage: 0,
        //         widthtimes: 2,
        //         heigthtimes: 2,
        //         fonttype: 1
        //     });

        //     await BluetoothEscposPrinter.printText("Date: " + new Date().toLocaleDateString() + "\n", {});
        //     await BluetoothEscposPrinter.printText("Voucher ID: 12345\n", {});
        //     await BluetoothEscposPrinter.printText("---------------------------\n", {});
        //     await BluetoothEscposPrinter.printText("Total Amount: $50.00\n\n", {
        //         encoding: 'GBK',
        //         widthtimes: 2,
        //         heigthtimes: 2
        //     });

        //     await BluetoothEscposPrinter.printQRCode("https://example.com/voucher/12345", 280, 280, 2);
        //     await BluetoothEscposPrinter.printText("\n\n\n", {});
        // } catch (error) {
        //     console.log("Print Error:", error);
        // }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Voucher Printer</Text>
            <TouchableOpacity style={styles.button} onPress={printVoucher}>
                <Text style={styles.buttonText}>Print Voucher</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        borderRadius: 8,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
});

export default VoucherPrintScreen;
