import React from 'react';
import { View } from 'react-native';
export const Radio = ({ selected }) => (
  <View
    style={{
        
      height: 20,
      width: 20,
      borderRadius: 10,
      borderWidth: 2,
      borderColor: selected ? "#4A90D9" : "#ccc",
      alignItems: "center",
      justifyContent: "center",

    }}
  >
    {selected && (
      <View
        style={{
          height: 10,
          width: 10,
          borderRadius: 5,
          backgroundColor: "#4A90D9",
        }}
      />
    )}
  </View>
);