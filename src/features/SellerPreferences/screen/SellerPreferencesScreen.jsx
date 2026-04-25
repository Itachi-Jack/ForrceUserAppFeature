// HomeScreen.jsx
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from "react";
import { getSellerPreference, updateSellerPreference } from '../api/sellerPreferencesApi';
import { Radio } from '../components/Radio';
import { useSellerStore } from '../context/zustandStore';
export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const preference = useSellerStore(s => s.preference);
  const setPreference = useSellerStore(s => s.setPreference);
  const setConfig = useSellerStore(s => s.setConfig);

  useEffect(() => {
    fetchPreference();
  }, []);


  const fetchPreference = async () => {
    try {
      const res = await getSellerPreference();
      const data = res.message[0];
      console.log("Fetched data : " , data);
       console.log("From backend:", data.preferences.seller_preference);
      setConfig(
        data.local_distance.minimum,
        data.local_distance.maximum,
      )
      setPreference({
      type: data.preferences.seller_preference,
      radius: data.preferences.radius_km,
    });
    } catch (err) {
      console.log("fetchPreference failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAllSellers = async () => {
    setPreference({ type: "All Sellers" });
    try {
      await updateSellerPreference({ seller_preference: "All Sellers" });
    } catch (err) {
      console.log(err);
    }
  };

  const handleLocalSeller = async () => {
    setPreference({ type: "Local Sellers" });
    await updateSellerPreference({
      seller_preference: "Local Sellers",
    });
    console.log("Local Sellers clicked");
    navigation.navigate('LocalSeller');
  };

  const handlePreferredSeller = async () => {
    setPreference({ type: "Preferred Sellers" });
    await updateSellerPreference({
      seller_preference: "Preferred Sellers",
    });
    navigation.navigate('PreferredSeller');

  }


  if (loading) return <ActivityIndicator style={{ flex: 1 }} size="large" color="#4A90D9" />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Sellers</Text>
      <Text style={styles.subtitle}>What type of seller are you looking for?</Text>

      <TouchableOpacity style={styles.card} onPress={handleAllSellers}>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>All Sellers</Text>
            <Text style={styles.cardDesc}>Browse every seller available</Text>
          </View>
          <Radio selected={preference.type === "All Sellers"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleLocalSeller}>
        <Text style={styles.cardIcon}>📍</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Local Seller</Text>
          </View>
          <Radio selected={preference.type === "Local Sellers"} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handlePreferredSeller}>
        <Text style={styles.cardIcon}>⭐</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Preferred</Text>
            <Text style={styles.cardDesc}>Your saved favourite sellers</Text>
          </View>
          <Radio selected={preference.type === "Preferred Sellers"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    marginBottom: 28,
  },
  card: {
    flexDirection: 'row',   // icon and text sit SIDE BY SIDE
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    borderRadius: 14,
    marginBottom: 14,
    gap: 14,                // space between icon and text
    borderWidth: 1.5,
    borderColor: 'transparent',
    // shadow for iOS
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowRadius: 6,
    // shadow for Android
    elevation: 2,
  },
  cardHighlight: {
    borderColor: '#4A90D9', // blue border to make it stand out
  },
  cardIcon: {
    fontSize: 28,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#222',
  },
  cardDesc: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
});