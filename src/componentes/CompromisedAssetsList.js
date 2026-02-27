import { FlatList, StyleSheet, Text, View } from "react-native";
import { inventory, vulnerabilities } from "../data/mockData";

export default function CompromisedAssetsList({ dark = false }) {
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
      <View style={[styles.assetCard, dark ? styles.assetCardDark : styles.assetCardLight]}>
        <View style={styles.assetHeader}>
          <Text style={[styles.assetName, dark && styles.assetNameDark]}>{item.assetName}</Text>
          <View
            style={[
              styles.severityBadge,
              { backgroundColor: severityColors[item.mostSevere] },
            ]}
          >
            <Text style={styles.severityText}>{item.mostSevere}</Text>
          </View>
        </View>
        <Text style={[styles.assetDetail, dark && styles.assetDetailDark]}>
          Vulnerabilidades: {item.vulnCount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, dark && styles.sectionTitleDark]}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  sectionTitleDark: {
    fontSize: 18,
    color: "#fff",
  },
  assetCard: {
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: "#ff4444",
  },
  assetCardLight: {
    backgroundColor: "#f9f9f9",
  },
  assetCardDark: {
    backgroundColor: "#1e1e1e",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 15,
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
  assetNameDark: {
    fontSize: 16,
    color: "#fff",
  },
  severityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: 10,
  },
  severityText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  assetDetail: {
    fontSize: 12,
    color: "#666",
  },
  assetDetailDark: {
    fontSize: 14,
    color: "#aaa",
  },
});
