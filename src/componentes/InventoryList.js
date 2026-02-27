import { FlatList, StyleSheet, Text, View } from "react-native";
import { inventory } from "../data/mockData";

export default function InventoryList({ dark = false }) {
  const renderInventoryItem = ({ item }) => {
    const criticalityColors = {
      Critical: "#ff4444",
      High: "#ff8800",
      Medium: "#ffaa00",
      Low: "#88cc00",
    };

    return (
      <View style={[styles.inventoryCard, dark ? styles.inventoryCardDark : styles.inventoryCardLight]}>
        <View style={styles.inventoryHeader}>
          <Text style={[styles.inventoryName, dark && styles.inventoryNameDark]}>{item.name}</Text>
          <View
            style={[
              styles.criticalityBadge,
              { backgroundColor: criticalityColors[item.criticality] },
            ]}
          >
            <Text style={styles.criticalityText}>{item.criticality}</Text>
          </View>
        </View>
        <View style={styles.inventoryDetails}>
          <Text style={[styles.inventoryDetail, dark && styles.inventoryDetailDark]}>
            <Text style={[styles.inventoryLabel, dark && styles.inventoryLabelDark]}>ID:</Text> {item.id}
          </Text>
          <Text style={[styles.inventoryDetail, dark && styles.inventoryDetailDark]}>
            <Text style={[styles.inventoryLabel, dark && styles.inventoryLabelDark]}>Tipo:</Text> {item.type}
          </Text>
          <Text style={[styles.inventoryDetail, dark && styles.inventoryDetailDark]}>
            <Text style={[styles.inventoryLabel, dark && styles.inventoryLabelDark]}>SO/Sistema:</Text> {item.os}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.sectionTitle, dark && styles.sectionTitleDark]}>
        📦 Inventario de Activos ({inventory.length})
      </Text>
      <FlatList
        data={inventory}
        keyExtractor={(item) => item.id}
        renderItem={renderInventoryItem}
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
  inventoryCard: {
    borderRadius: 6,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
  },
  inventoryCardLight: {
    backgroundColor: "#f9f9f9",
    borderLeftColor: "#003366",
  },
  inventoryCardDark: {
    backgroundColor: "#1e1e1e",
    borderLeftColor: "#00ffcc",
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 8,
    padding: 15,
  },
  inventoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  inventoryName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
    marginRight: 10,
  },
  inventoryNameDark: {
    fontSize: 16,
    color: "#fff",
  },
  criticalityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 4,
  },
  criticalityText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
  },
  inventoryDetails: {
    gap: 6,
  },
  inventoryDetail: {
    fontSize: 12,
    color: "#666",
  },
  inventoryDetailDark: {
    fontSize: 14,
    color: "#aaa",
  },
  inventoryLabel: {
    color: "#003366",
    fontWeight: "600",
  },
  inventoryLabelDark: {
    color: "#00ffcc",
  },
});
