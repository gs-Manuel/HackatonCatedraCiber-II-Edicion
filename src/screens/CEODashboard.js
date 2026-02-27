import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { vulnerabilities, inventory } from "../data/mockData";

const POWER_BI_EMBED_URL =
  "https://app.powerbi.com/view?r=eyJrIjoiY2UyMGJlYjAtMWRjMS00MDEyLTk3YmItMmYzNGNlN2JjMDIwIiwidCI6IjA1ZWE3NGEzLTkyYzUtNGMzMS05NzhhLTkyNWMzYzc5OWNkMCIsImMiOjh9";

export default function CEODashboard({ navigation }) {
  const WebViewComponent =
    Platform.OS !== "web" ? require("react-native-webview").WebView : null;

  const criticalCount = vulnerabilities.filter(
    (v) => v.severity === "Critical" && v.status === "Open",
  ).length;
  const riskScore = Math.max(0, 100 - criticalCount * 5); // Lógica simple de riesgo

  // Calcular activos comprometidos
  const getCompromisedAssets = () => {
    const assetMap = {};
    
    // Agrupar vulnerabilidades abiertas por activo
    vulnerabilities
      .filter((v) => v.status === "Open")
      .forEach((v) => {
        if (!assetMap[v.affectedAssetId]) {
          assetMap[v.affectedAssetId] = {
            assetId: v.affectedAssetId,
            vulnerabilities: [],
          };
        }
        assetMap[v.affectedAssetId].vulnerabilities.push(v);
      });

    // Convertir a array y ordenar
    return Object.values(assetMap)
      .map((item) => {
        const asset = inventory.find((a) => a.id === item.assetId);
        const severities = ["Critical", "High", "Medium", "Low"];
        const mostSevere = item.vulnerabilities.reduce((most, curr) => {
          const mostIndex = severities.indexOf(most.severity);
          const currIndex = severities.indexOf(curr.severity);
          return currIndex < mostIndex ? curr : most;
        }).severity;

        return {
          assetId: item.assetId,
          assetName: asset?.name || "Desconocido",
          vulnCount: item.vulnerabilities.length,
          mostSevere: mostSevere,
        };
      })
      .sort((a, b) => b.vulnCount - a.vulnCount);
  };

  const compromisedAssets = getCompromisedAssets();

  const renderCompromisedAsset = ({ item }) => {
    const severityColors = {
      Critical: "#ff4444",
      High: "#ff8800",
      Medium: "#ffaa00",
      Low: "#88cc00",
    };

    return (
      <View style={styles.assetCard}>
        <View style={styles.assetHeader}>
          <Text style={styles.assetName}>{item.assetName}</Text>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: severityColors[item.mostSevere] },
            ]}
          >
            <Text style={styles.severityText}>{item.mostSevere}</Text>
          </View>
        </View>
        <Text style={styles.assetDetail}>
          Vulnerabilidades: {item.vulnCount}
        </Text>
      </View>
    );
  };

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

        <View style={styles.compromisedAssetsSection}>
          <Text style={styles.sectionTitle}>
            🔴 Activos Comprometidos ({compromisedAssets.length})
          </Text>
          <FlatList
            data={compromisedAssets}
            keyExtractor={(item) => item.assetId}
            renderItem={renderCompromisedAsset}
            scrollEnabled={false}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
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
  compromisedAssetsSection: {
    marginTop: 20,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  assetCard: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 6,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4444",
  },
  assetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  assetName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  severityText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  assetDetail: {
    fontSize: 12,
    color: "#666",
  },
});
