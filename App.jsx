import AppNavigator from "./src/app/AppNavigator";
import { NavigationContainer } from "@react-navigation/native";
export default function App() {
     return (
          <NavigationContainer>
               <AppNavigator />
          </NavigationContainer>
     );
}