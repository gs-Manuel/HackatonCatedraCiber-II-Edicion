import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { vulnerabilities } from "../data/mockData";

const POWER_BI_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiY2UyMGJlYjAtMWRjMS00MDEyLTk3YmItMmYzNGNlN2JjMDIwIiwidCI6IjA1ZWE3NGEzLTkyYzUtNGMzMS05NzhhLTkyNWMzYzc5OWNkMCIsImMiOjh9";

export default function CEODashboard({ navigation }) {
  const WebViewComponent =
    Platform.OS !== "web" ? require("react-native-webview").WebView : null;

  const criticalCount = vulnerabilities.filter(
    (v) => v.severity === "Critical" && v.status === "Open",
  ).length;
  const riskScore = Math.max(0, 100 - criticalCount * 5); // Lógica simple de riesgo

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Ejecutivo (CEO)</Text>
        <TouchableOpacity
          style={styles.navButton}
          onPress={() => navigation.navigate("CISO")}
        >
          <Text style={styles.navButtonText}>Ir a CISO</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{riskScore}/100</Text>
            <Text style={styles.metricLabel}>
              Índice de Salud (Ciberseguridad)
            </Text>
          </View>
          <View
            style={[
              styles.metricCard,
              { borderLeftColor: "#ff4444", borderLeftWidth: 4 },
            ]}
          >
            <Text style={styles.metricValue}>{criticalCount}</Text>
            <Text style={styles.metricLabel}>
              Vulnerabilidades Críticas Abiertas
            </Text>
          </View>
        </View>

        <View style={styles.powerBiContainer}>
          <Text style={styles.powerBiTitle}>
            📊 Power BI: Resumen de Riesgo de Negocio
          </Text>
          {Platform.OS === "web" ? (
            <iframe
              src={POWER_BI_EMBED_URL}
              title="Hackathon"
              width="100%"
              height="100%"
              frameBorder="0"
              allowFullScreen
              style={styles.powerBiIframe}
            />
          ) : (
            <WebViewComponent
              source={{ uri: POWER_BI_EMBED_URL }}
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: {
    padding: 20,
    backgroundColor: "#003366",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTitle: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  navButton: {
    backgroundColor: "#00a6ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
  },
  navButtonText: { color: "#fff", fontWeight: "bold", fontSize: 12 },
  content: { padding: 15 },
  metricsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricCard: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 2,
  },
  metricValue: { fontSize: 24, fontWeight: "bold", color: "#333" },
  metricLabel: { fontSize: 12, color: "#666", marginTop: 5 },
  powerBiContainer: {
    height: 560,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    overflow: "hidden",
  },
  powerBiTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
    textAlign: "center",
    paddingVertical: 12,
    backgroundColor: "#f2f2f2",
  },
  powerBiWebview: {
    flex: 1,
  },
  powerBiIframe: {
    borderWidth: 0,
    flex: 1,
  },
});
