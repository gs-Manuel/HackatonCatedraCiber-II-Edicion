import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { inventory, vulnerabilities } from "../data/mockData";
import VulnerabilityDetail from "./VulnerabilityDetail";

export default function VulnerabilitiesList() {
  const [sortByCVSS, setSortByCVSS] = useState("desc");
  const [selectedSeverity, setSelectedSeverity] = useState(null);
  const [daysFilter, setDaysFilter] = useState(null);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [selectedVulnerability, setSelectedVulnerability] = useState(null);

  // Calcular fecha de cutoff basada en días
  const getCutoffDate = () => {
    const now = new Date();
    if (!daysFilter) return new Date(0); // Si no hay filtro, mostrar todas
    const cutoff = new Date(now.getTime() - daysFilter * 24 * 60 * 60 * 1000);
    return cutoff;
  };

  // Filtrar vulnerabilidades
  let filteredVulns = vulnerabilities.filter((v) => {
    const matchStatus = v.status === "Open";
    const matchSeverity = selectedSeverity
      ? v.severity === selectedSeverity
      : true;

    // Filtro de fecha - parsear la fecha string
    const cutoffDate = getCutoffDate();
    const vulnDate = new Date(v.discoveredDate);
    const matchDate = vulnDate >= cutoffDate;

    return matchStatus && matchSeverity && matchDate;
  });

  // Ordenar por CVSS
  if (sortByCVSS === "desc") {
    filteredVulns.sort((a, b) => b.cvss - a.cvss);
  } else {
    filteredVulns.sort((a, b) => a.cvss - b.cvss);
  }

  const renderVuln = ({ item }) => {
    const asset = inventory.find((a) => a.id === item.affectedAssetId);
    return (
      <TouchableOpacity
        style={styles.vulnCard}
        onPress={() => {
          setSelectedVulnerability(item);
          setDetailVisible(true);
        }}
        activeOpacity={0.7}
      >
        <View style={styles.vulnHeader}>
          <Text style={styles.vulnName}>
            {item.cve} - {item.name}
          </Text>
          <View style={styles.badgeContainer}>
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
            <Text style={styles.cvssScore}>CVSS: {item.cvss}</Text>
          </View>
        </View>
        <Text style={styles.vulnDetail}>Activo Afectado: {asset ? asset.name : "Desconocido"} (
          {item.affectedAssetId})
        </Text>
        <View style={styles.vulnFooter}>
          <Text style={styles.vulnDetail}>Estado: {item.status}</Text>
          <Text style={styles.detailIndicator}>→</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>
        Vulnerabilidades Abiertas ({filteredVulns.length})
      </Text>

      {/* Botón para mostrar/ocultar filtros */}
      <TouchableOpacity
        style={styles.filterToggleButton}
        onPress={() => setFiltersVisible(!filtersVisible)}
      >
        <Text style={styles.filterToggleText}>
          {filtersVisible ? "▼ Ocultar Filtros" : "▶ Mostrar Filtros"}
        </Text>
      </TouchableOpacity>

      {/* Controles de Ordenamiento y Filtros */}
      {filtersVisible && (
        <View style={styles.controlsContainer}>
          {/* Ordenar por CVSS */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Ordenar CVSS:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  sortByCVSS === "desc" && styles.filterButtonActive,
                ]}
                onPress={() => setSortByCVSS("desc")}
              >
                <Text style={styles.filterButtonText}>Mayor ↓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  sortByCVSS === "asc" && styles.filterButtonActive,
                ]}
                onPress={() => setSortByCVSS("asc")}
              >
                <Text style={styles.filterButtonText}>Menor ↑</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filtrar por Criticidad */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>Criticidad:</Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  !selectedSeverity && styles.filterButtonActive,
                ]}
                onPress={() => setSelectedSeverity(null)}
              >
                <Text style={styles.filterButtonText}>Todas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedSeverity === "Critical" && styles.filterButtonActive,
                ]}
                onPress={() =>
                  setSelectedSeverity(
                    selectedSeverity === "Critical" ? null : "Critical",
                  )
                }
              >
                <Text style={styles.filterButtonText}>Críticas</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  selectedSeverity === "High" && styles.filterButtonActive,
                ]}
                onPress={() =>
                  setSelectedSeverity(
                    selectedSeverity === "High" ? null : "High",
                  )
                }
              >
                <Text style={styles.filterButtonText}>Altas</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Filtrar por Rango de Días */}
          <View style={styles.filterSection}>
            <Text style={styles.filterLabel}>
              Período: {daysFilter ? `${daysFilter} días` : "Todos"}
            </Text>
            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  daysFilter === null && styles.filterButtonActive,
                ]}
                onPress={() => setDaysFilter(null)}
              >
                <Text style={styles.filterButtonText}>Todos</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  daysFilter === 30 && styles.filterButtonActive,
                ]}
                onPress={() => setDaysFilter(daysFilter === 30 ? null : 30)}
              >
                <Text style={styles.filterButtonText}>30 días</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  daysFilter === 90 && styles.filterButtonActive,
                ]}
                onPress={() => setDaysFilter(daysFilter === 90 ? null : 90)}
              >
                <Text style={styles.filterButtonText}>90 días</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.filterButton,
                  daysFilter === 365 && styles.filterButtonActive,
                ]}
                onPress={() => setDaysFilter(daysFilter === 365 ? null : 365)}
              >
                <Text style={styles.filterButtonText}>1 año</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      <FlatList
        data={filteredVulns}
        keyExtractor={(item) => item.id}
        renderItem={renderVuln}
        contentContainerStyle={{ paddingBottom: 20, minHeight: 300 }}
        scrollEnabled={false}
        nestedScrollEnabled={false}
      />

      <VulnerabilityDetail
        visible={detailVisible}
        vulnerability={selectedVulnerability}
        onClose={() => setDetailVisible(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterToggleButton: {
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00ffcc",
    alignItems: "center",
  },
  filterToggleText: {
    color: "#00ffcc",
    fontSize: 14,
    fontWeight: "bold",
  },
  controlsContainer: {
    backgroundColor: "#1e1e1e",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#333",
  },
  filterSection: {
    marginBottom: 12,
  },
  filterLabel: {
    color: "#00ffcc",
    fontSize: 13,
    fontWeight: "bold",
    marginBottom: 6,
  },
  buttonGroup: {
    flexDirection: "row",
    gap: 8,
    flexWrap: "wrap",
  },
  filterButton: {
    backgroundColor: "#2a2a2a",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#444",
  },
  filterButtonActive: {
    backgroundColor: "#00ffcc",
    borderColor: "#00ffcc",
  },
  filterButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  cvssScore: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    backgroundColor: "#333",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
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
    alignItems: "flex-start",
    marginBottom: 5,
    flexWrap: "wrap",
    gap: 8,
  },
  vulnName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
    flex: 1,
    flexWrap: "wrap",
  },
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
  vulnFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  detailIndicator: {
    color: "#00ffcc",
    fontSize: 16,
    fontWeight: "bold",
  },
});
