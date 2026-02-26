import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import CEODashboard from "./src/screens/CEODashboard";
import CISODashboard from "./src/screens/CISODashboard";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator
        initialRouteName="HomeCEO"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="HomeCEO" component={CEODashboard} />
        <Stack.Screen name="CISO" component={CISODashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
