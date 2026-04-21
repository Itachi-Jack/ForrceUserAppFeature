// HomeScreen.jsx
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect, useContext } from "react";
import { SellerPreferenceContext } from '../context/SellerPreferenceContext';
import { getSellerPreference } from '../api/sellerPreferencesApi';
import { Radio } from '../components/Radio';
import { updateSellerPreference } from '../api/sellerPreferencesApi';
export default function HomeScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { sellerPreference, setSellerPreference } = useContext(SellerPreferenceContext);


  useEffect(() => {
    fetchPreference();
  }, []);

  const fetchPreference = async () => {
    setLoading(true);
    try {
      const res = await getSellerPreference();

      const data = res.message[0];
      console.log("Fetched seller preference:", data);

      setSellerPreference({
        min: data.local_distance.minimum,
        max: data.local_distance.maximum,
        radius: data.preferences.radius_km,
        type: data.preferences.seller_preference,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  const handleAllSellers = async () => {
    console.log("All Sellers clicked");
    setSellerPreference(prev => ({
      ...prev,
      type: "All Sellers",
    }));

    try{
      const payload = {
        seller_preference : "All Sellers",
      }
      await updateSellerPreference(payload);
    }catch(err){
      console.log(err);
      throw err;
    }


  };
  const handleLocalSeller = () => {
  
  console.log("Local Seller clicked");

 
  setSellerPreference(prev => ({
    ...prev,
    type: "Local Sellers",
  }));

 
  navigation.navigate('LocalSeller');
};
const handlePreferredSeller = () => {
  
  console.log("Preferred Seller clicked");

 
  setSellerPreference(prev => ({
    ...prev,
    type: "Preferred Sellers",
  }));

 
  navigation.navigate('PreferredSeller');
};

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Find Sellers</Text>
      <Text style={styles.subtitle}>What type of seller are you looking for?</Text>

      {/* CHOICE 1 — All Sellers */}
      <TouchableOpacity style={styles.card} onPress={handleAllSellers}>
     
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>All Sellers</Text>
            <Text style={styles.cardDesc}>Browse every seller available</Text>
          </View>
          
          <Radio selected={sellerPreference?.type === "All Sellers"} />
        </View>
      </TouchableOpacity>

      {/* CHOICE 2 — Local Seller — this navigates to the next screen */}
      <TouchableOpacity style={styles.card} onPress={handleLocalSeller}>
        <Text style={styles.cardIcon}>📍</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Local Seller</Text>
          </View>
          <Radio selected={sellerPreference?.type === "Local Sellers"} />
        </View>
      </TouchableOpacity>

      {/* CHOICE 3 — Preferred */}
      <TouchableOpacity style={styles.card} onPress={handlePreferredSeller}>
        <Text style={styles.cardIcon}>⭐</Text>
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardTitle}>Preferred</Text>
            <Text style={styles.cardDesc}>Your saved favourite sellers</Text>
          </View>
          <Radio selected={sellerPreference?.type === "Preferred Sellers"} />
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