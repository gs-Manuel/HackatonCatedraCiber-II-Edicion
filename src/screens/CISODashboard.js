import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { vulnerabilities, inventory } from '../data/mockData';

export default function CISODashboard({ onLogout }) {
  const openVulns = vulnerabilities.filter(v => v.status === 'Open');

  const renderVuln = ({ item }) => {
    const asset = inventory.find(a => a.id === item.affectedAssetId);
    return (
      <View style={styles.vulnCard}>
        <View style={styles.vulnHeader}>
          <Text style={styles.vulnName}>{item.cve} - {item.name}</Text>
          <Text style={[styles.badge, item.severity === 'Critical' ? styles.badgeCritical : styles.badgeHigh]}>
            {item.severity}
          </Text>
        </View>
        <Text style={styles.vulnDetail}>Activo Afectado: {asset ? asset.name : 'Desconocido'} ({item.affectedAssetId})</Text>
        <Text style={styles.vulnDetail}>Estado: {item.status}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Técnico (CISO)</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.content}>
        <View style={styles.powerBiPlaceholder}>
          <Text style={styles.powerBiText}>📊 Power BI: Estado de Parches y Amenazas</Text>
          <Text style={styles.powerBiSubText}>
            (Aquí iría el iframe/WebView del reporte detallado para el CISO. 
            Para implementarlo, instala 'react-native-webview' y usa la URL de tu reporte publicado.)
          </Text>
        </View>

        <Text style={styles.sectionTitle}>Vulnerabilidades Abiertas ({openVulns.length})</Text>
        <FlatList
          data={openVulns}
          keyExtractor={item => item.id}
          renderItem={renderVuln}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#1e1e1e', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#333' },
  headerTitle: { color: '#00ffcc', fontSize: 18, fontWeight: 'bold' },
  logoutBtn: { padding: 8, backgroundColor: '#ff4444', borderRadius: 5 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  content: { flex: 1, padding: 15 },
  powerBiPlaceholder: { height: 200, backgroundColor: '#1e1e1e', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#333', borderStyle: 'dashed', marginBottom: 20 },
  powerBiText: { fontSize: 16, fontWeight: 'bold', color: '#aaa', textAlign: 'center' },
  powerBiSubText: { fontSize: 12, color: '#666', marginTop: 10, textAlign: 'center', paddingHorizontal: 20 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  vulnCard: { backgroundColor: '#1e1e1e', padding: 15, borderRadius: 8, marginBottom: 10, borderWidth: 1, borderColor: '#333' },
  vulnHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
  vulnName: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
  badge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 4, fontSize: 12, fontWeight: 'bold', color: '#fff', overflow: 'hidden' },
  badgeCritical: { backgroundColor: '#ff4444' },
  badgeHigh: { backgroundColor: '#ff8800' },
  vulnDetail: { color: '#aaa', fontSize: 12, marginTop: 2 }
});