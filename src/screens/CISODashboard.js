import { useState } from "react";
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import VulnerabilitiesList from "../componentes/VulnerabilitiesList";
import InventoryList from "../componentes/InventoryList";

const POWER_BI_WEB_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiZjg4MzQ2MjEtYzg3Yy00Mjc3LThlZmUtNzM4YTdjYjQzNDAwIiwidCI6IjA1ZWE3NGEzLTkyYzUtNGMzMS05NzhhLTkyNWMzYzc5OWNkMCIsImMiOjh9";
const POWER_BI_MOBILE_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiMjg2NjY5YmQtMmU3MS00ZDdhLWIzYjMtMjdjMThlNTA4NWRkIiwidCI6IjA1ZWE3NGEzLTkyYzUtNGMzMS05NzhhLTkyNWMzYzc5OWNkMCIsImMiOjh9";

export default function CISODashboard({ navigation }) {
  const WebViewComponent =
    Platform.OS !== "web" ? require("react-native-webview").WebView : null;
  const powerBiUrl =
    Platform.OS === "web" ? POWER_BI_WEB_EMBED_URL : POWER_BI_MOBILE_EMBED_URL;

  const [activeView, setActiveView] = useState("vulnerabilities"); // 'vulnerabilities' o 'inventory'

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Técnico (CISO)</Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("HomeCEO")}
        >
          <Text style={styles.navButtonText}>Volver a Inicio</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.powerBiContainer}>
          <Text style={styles.powerBiTitle}>
            📊 Power BI: Estado de Parches y Amenazas
          </Text>
          {Platform.OS === "web" ? (
            <iframe
              src={powerBiUrl}
              title="Hackathon"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={styles.powerBiIframe}
            />
          ) : (
            <WebViewComponent
              source={{ uri: powerBiUrl }}
              style={styles.powerBiWebview}
              javaScriptEnabled
              domStorageEnabled
              startInLoadingState
              scalesPageToFit
              allowsFullscreenVideo
              setSupportMultipleWindows={false}
              nestedScrollEnabled
              originWhitelist={["*"]}
            />
          )}
        </View>

        <View style={styles.viewSelectorContainer}>
          <TouchableOpacity
            style={[
              styles.viewButton,
              activeView === "vulnerabilities" && styles.viewButtonActive,
            ]}
            onPress={() => setActiveView("vulnerabilities")}
          >
            <Text
              style={[
                styles.viewButtonText,
                activeView === "vulnerabilities" && styles.viewButtonTextActive,
              ]}
            >
               Vulnerabilidades
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.viewButton,
              activeView === "inventory" && styles.viewButtonActive,
            ]}
            onPress={() => setActiveView("inventory")}
          >
            <Text
              style={[
                styles.viewButtonText,
                activeView === "inventory" && styles.viewButtonTextActive,
              ]}
            >
               Inventario
            </Text>
          </TouchableOpacity>
        </View>

        {activeView === "vulnerabilities" ? (
          <VulnerabilitiesList />
        ) : (
          <InventoryList dark={true} />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#121212" },
  header: {
    padding: 20,
    backgroundColor: "#1e1e1e",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerTitle: { color: "#00ffcc", fontSize: 18, fontWeight: "bold" },
  navButton: {
    backgroundColor: "#00a6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  content: { flex: 1, padding: 15 },
  powerBiContainer: {
    height: Platform.OS === "web" ? 560 : 300,
    backgroundColor: "#1e1e1e",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    overflow: "hidden",
    marginBottom: 20,
  },
  powerBiTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
    textAlign: "center",
    paddingVertical: 12,
    backgroundColor: "#222",
  },
  powerBiWebview: {
    flex: 1,
  },
  powerBiIframe: {
    borderWidth: 0,
    flex: 1,
  },
  viewSelectorContainer: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 20,
  },
  viewButton: {
    flex: 1,
    backgroundColor: "#1e1e1e",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#333",
    alignItems: "center",
  },
  viewButtonActive: {
    backgroundColor: "#00ffcc",
    borderColor: "#00ffcc",
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#aaa",
  },
  viewButtonTextActive: {
    color: "#121212",
  },
});
