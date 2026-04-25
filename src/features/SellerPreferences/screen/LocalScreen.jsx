import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { updateSellerPreference } from "../api/sellerPreferencesApi";
import CustomSlider from "../components/CustomSlider";
import { useSellerStore } from "../context/zustandStore";
import { getSellerPreference } from "../api/sellerPreferencesApi";

export default function LocalScreen() {
  const [loading, setLoading] = useState(false);
  const preference = useSellerStore(state => state.preference);
  const setPreference = useSellerStore(state => state.setPreference);
  const { min, max } = useSellerStore(state => state.config);
  const [tempRadius, setTempRadius] = useState(preference.radius);
  useEffect(() => {
    setTempRadius(preference.radius);
  }, [preference.radius]);

  const handleSearch = async () => {
    setLoading(true);

    const payload = {
      seller_preference: "Local Sellers",
      radius_km: tempRadius,
    };

    console.log("Sending payload:", payload);


    try {
      await updateSellerPreference(payload);
      setPreference({ radius: tempRadius });
      console.log("API call successful");
    } catch (err) {
      console.log("Error:", err);
      Alert.alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>How far should we look?</Text>

      <Text style={styles.radiusText}>{tempRadius} km</Text>

      <CustomSlider
        min={min}
        max={max}
        step={1}
        value={tempRadius}
        onChange={(val) => setTempRadius(val)}
      />

      <View style={styles.sliderLabels}>
        <Text style={styles.labelText}>{min} km</Text>
        <Text style={styles.labelText}>{max} km</Text>
      </View>

      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Search in {tempRadius} km radius</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#4A90D9" style={{ marginTop: 20 }} />}
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
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  radiusText: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90D9',
    marginBottom: 10,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  labelText: {
    color: '#888',
    fontSize: 13,
  },
  searchButton: {
    backgroundColor: '#4A90D9',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});