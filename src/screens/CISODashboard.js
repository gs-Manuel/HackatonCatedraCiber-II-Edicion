import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { inventory, vulnerabilities } from "../data/mockData";

export default function CISODashboard({ navigation }) {
  const openVulns = vulnerabilities.filter((v) => v.status === "Open");

  const renderVuln = ({ item }) => {
    const asset = inventory.find((a) => a.id === item.affectedAssetId);
    return (
      <View style={styles.vulnCard}>
        <View style={styles.vulnHeader}>
          <Text style={styles.vulnName}>
            {item.cve} - {item.name}
          </Text>
          <Text
            style={[
              styles.badge,
              item.severity === "Critical"
                ? styles.badgeCritical
                : styles.badgeHigh,
            ]}
          >
            {item.severity}
          </Text>
        </View>
        <Text style={styles.vulnDetail}>
          Activo Afectado: {asset ? asset.name : "Desconocido"} (
          {item.affectedAssetId})
        </Text>
        <Text style={styles.vulnDetail}>Estado: {item.status}</Text>
      </View>
    );
  };

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

      <View style={styles.content}>
        <View style={styles.powerBiPlaceholder}>
          <Text style={styles.powerBiText}>
            📊 Power BI: Estado de Parches y Amenazas
          </Text>
          <Text style={styles.powerBiSubText}>
            (Aquí iría el iframe/WebView del reporte detallado para el CISO.
            Para implementarlo, instala 'react-native-webview' y usa la URL de
            tu reporte publicado.)
          </Text>
        </View>

        <Text style={styles.sectionTitle}>
          Vulnerabilidades Abiertas ({openVulns.length})
        </Text>
        <FlatList
          data={openVulns}
          keyExtractor={(item) => item.id}
          renderItem={renderVuln}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
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
  powerBiPlaceholder: {
    height: 200,
    backgroundColor: "#1e1e1e",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#333",
    borderStyle: "dashed",
    marginBottom: 20,
  },
  powerBiText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#aaa",
    textAlign: "center",
  },
  powerBiSubText: {
    fontSize: 12,
    color: "#666",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vulnCard: {
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#333",
  },
  vulnHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  vulnName: { color: "#fff", fontWeight: "bold", fontSize: 14 },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff",
    overflow: "hidden",
  },
  badgeCritical: { backgroundColor: "#ff4444" },
  badgeHigh: { backgroundColor: "#ff8800" },
  vulnDetail: { color: "#aaa", fontSize: 12, marginTop: 2 },
});
