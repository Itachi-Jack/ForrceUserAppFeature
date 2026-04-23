import React, { useState, useContext, useEffect } from "react";
import Slider from '@react-native-community/slider';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { updateSellerPreference } from "../api/sellerPreferencesApi";
import { useSellerStore } from "../context/zustandStore";
import CustomSlider from "../components/CustomSlider";

export default function LocalScreen() {
  const [loading, setLoading] = useState(false);
  const [sellerCount, setSellerCount] = useState(null);
  const sellerPreference = useSellerStore(state => state.sellerPreference);
  const setSellerPreference = useSellerStore(state => state.setSellerPreference);
  const radius = sellerPreference.radius;
  const [tempRadius, setTempRadius] = useState(radius);
  useEffect(() => {
    setTempRadius(radius);
  }, [radius]);


  const handleSearch = async () => {
    setLoading(true);
    try {
      setSellerPreference({
        type: "Local Sellers",
        radius: tempRadius,  // ✅ use tempRadius
      });
      const payload = {
        seller_preference: "Local Sellers",
        radius_km: tempRadius,  // ✅ use tempRadius
      };
      await updateSellerPreference(payload);
    } catch (err) {
      Alert.alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>How far should we look?</Text>

      {/* Big radius display */}
      <Text style={styles.radiusText}>{tempRadius} km</Text>


      {/* <Slider
        style={[styles.slider,]}
        minimumValue={sellerPreference.min}     
        maximumValue={sellerPreference.max}     
        step={1}               
        value={radius}    
        thumbSize = {{height : 100, width: 100}}
        onValueChange={ (value) => {
          setRadius(value)
        }         
      }
        minimumTrackTintColor="#4A90D9"  // Blue for the LEFT side of slider
        maximumTrackTintColor="#ccc"     // Gray for the RIGHT side
        thumbTintColor="#4A90D9"         // The circle you drag = blue
      /> */}


      <CustomSlider
        min={sellerPreference.min}
        max={sellerPreference.max}
        step={1}
        value={tempRadius}
        onChange={(val) => setTempRadius(val)}           // local only — no store write
        onSlidingComplete={(val) => {                    // store write only on release
          setTempRadius(val);
          setSellerPreference({ radius: val });
        }}
      />


      <View style={styles.sliderLabels}>
        <Text style={styles.labelText}>{sellerPreference.min}km</Text>
        <Text style={styles.labelText}>{sellerPreference.max}km</Text>
      </View>

      {/* Search button */}
      <TouchableOpacity
        style={styles.searchButton}
        onPress={handleSearch}
        disabled={loading}

      >
        <Text style={styles.buttonText}>Search in {tempRadius} km radius</Text>
      </TouchableOpacity>

      {/* Show spinner OR results, never both */}
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
    fontSize: 48,              // BIG number in the center
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4A90D9',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',       // Put children SIDE BY SIDE (left-right)
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
  resultBox: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',        // Shadow (iOS)
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,               // Shadow (Android)
  },
  countText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  okButton: {
    backgroundColor: '#27ae60',  // Green = go!
    padding: 14,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
});


