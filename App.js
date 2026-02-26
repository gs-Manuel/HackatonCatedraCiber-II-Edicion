import { SafeAreaView, StatusBar, StyleSheet } from "react-native";
import CEODashboard from "./src/screens/CEODashboard";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <CEODashboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
