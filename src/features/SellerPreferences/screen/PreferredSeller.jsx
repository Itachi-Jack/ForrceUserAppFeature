import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from "react-native";
import { scanSeller } from "../api/sellerPreferencesApi";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { Alert } from "react-native";

export default function PreferredSeller() {
    const [isScanning, setIsScanning] = useState(false);
    const [hasScanned, setHasScanned] = useState(false);
    const [sellers, setSellers] = useState([]); // populate as sellers are added

    const handleScan = async (e) => {
        if (hasScanned) return;

        setHasScanned(true);
        setIsScanning(false);

        const sellerCode = e.data;
        console.log("Scanned Seller:", sellerCode);

        try {
            const res = await scanSeller(sellerCode);
            console.log("API Success ", res);
            Alert.alert("Success", "Seller added successfully");
            // TODO: push new seller into list, e.g.:
            // setSellers(prev => [...prev, res]);
        } catch (err) {
            console.log("Api Error : ", err?.res || err?.message);
        }

        setTimeout(() => setHasScanned(false), 2000);
    };

    const renderSeller = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.cardIcon}>🏪</Text>
            <View>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
            </View>
        </View>
    );

    if (isScanning) {
        return (
            <QRCodeScanner
                onRead={handleScan}
                showMarker={false}
                vibrate={false}
                cameraProps={{ autoFocus: true, focusDepth: 1 }}
                cameraStyle={{
                    height: 300,
                    alignSelf: "center",
                    width: "90%",
                    borderRadius: 20,
                    overflow: "hidden",
                }}
                topContent={
                    <View style={styles.topContainer}>
                        <Text style={styles.topText}>Scan Seller QR</Text>
                    </View>
                }
                bottomContent={
                    <View style={styles.bottomContainer}>
                        <TouchableOpacity
                            style={styles.cancelBtn}
                            onPress={() => setIsScanning(false)}
                        >
                            <Text style={styles.cancelText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        );
    }

    return (
        <View style={styles.container}>
         
            <View style={styles.header}>
                <View>
                    <Text style={styles.title}>Preferred Seller</Text>
                    <Text style={styles.subtitle}>Scan QR to add a seller</Text>
                </View>

                <TouchableOpacity
                    style={styles.scanButton}
                    onPress={() => setIsScanning(true)}
                >
                    <Text style={styles.scanText}>Scan QR</Text>
                </TouchableOpacity>
            </View>

            {/* ── Sellers list ── */}
            <FlatList
                data={sellers}
                keyExtractor={(item , index) => item.toString ?? index.toString()}
                renderItem={renderSeller}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyIcon}>🏪</Text>
                        <Text style={styles.emptyText}>No sellers added yet</Text>
                        <Text style={styles.emptySubText}>Scan a QR code to add your first seller</Text>
                    </View>
                }
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },

    /* ── Header ── */
    header: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#222',
    },
    subtitle: {
        fontSize: 13,
        color: '#888',
        marginTop: 2,
    },
    scanButton: {
        backgroundColor: "#4A90D9",
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderRadius: 10,
        marginTop: 15,
        alignSelf:"stretch",
        alignItems:"center",
    },
    scanText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 15,
    },

    /* ── List ── */
    listContent: {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: 24,
        flexGrow: 1,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 18,
        borderRadius: 14,
        marginBottom: 14,
        gap: 14,
        borderWidth: 1.5,
        borderColor: 'transparent',
        shadowColor: '#000',
        shadowOpacity: 0.07,
        shadowRadius: 6,
        elevation: 2,
    },
    cardIcon: { fontSize: 28 },
    cardTitle: { fontSize: 16, fontWeight: '700', color: '#222' },
    cardDesc: { fontSize: 13, color: '#888', marginTop: 2 },

    /* ── Empty state ── */
    emptyContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
    },
    emptyIcon: { fontSize: 48, marginBottom: 12 },
    emptyText: { fontSize: 17, fontWeight: '600', color: '#555' },
    emptySubText: { fontSize: 13, color: '#aaa', marginTop: 6, textAlign: 'center' },

    /* ── Scanner ── */
    topContainer: { padding: 20, alignItems: "center" },
    topText: { fontSize: 18, fontWeight: "600", color: "#222" },
    bottomContainer: { alignItems: "center", marginTop: 0 },
    cancelBtn: {
        backgroundColor: "#eee",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    cancelText: { color: "#333", fontWeight: "500" },
});