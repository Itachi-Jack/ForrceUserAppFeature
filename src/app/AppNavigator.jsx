import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../features/SellerPreferences/screen/SellerPreferencesScreen";
import LocalScreen from "../features/SellerPreferences/screen/LocalScreen";
import PreferredSeller from "../features/SellerPreferences/screen/PreferredSeller";

const Stack = createStackNavigator();

export default function AppNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SellerPreferences" component={HomeScreen} />
            <Stack.Screen name="LocalSeller" component={LocalScreen} />
            <Stack.Screen name="PreferredSeller" component={PreferredSeller} />
        </Stack.Navigator>
    );
}