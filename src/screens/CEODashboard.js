import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { vulnerabilities } from '../data/mockData';

export default function CEODashboard({ onLogout }) {
  const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical' && v.status === 'Open').length;
  const riskScore = Math.max(0, 100 - (criticalCount * 5)); // Lógica simple de riesgo

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard Ejecutivo (CEO)</Text>
        <TouchableOpacity onPress={onLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Salir</Text>
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.content}>
        <View style={styles.metricsContainer}>
          <View style={styles.metricCard}>
            <Text style={styles.metricValue}>{riskScore}/100</Text>
            <Text style={styles.metricLabel}>Índice de Salud (Ciberseguridad)</Text>
          </View>
          <View style={[styles.metricCard, { borderLeftColor: '#ff4444', borderLeftWidth: 4 }]}>
            <Text style={styles.metricValue}>{criticalCount}</Text>
            <Text style={styles.metricLabel}>Vulnerabilidades Críticas Abiertas</Text>
          </View>
        </View>

        <View style={styles.powerBiPlaceholder}>
          <Text style={styles.powerBiText}>📊 Power BI: Resumen de Riesgo de Negocio</Text>
          <Text style={styles.powerBiSubText}>
            (Aquí iría el iframe/WebView del reporte de Power BI para el CEO. 
            Para implementarlo, instala 'react-native-webview' y usa la URL de tu reporte publicado.)
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 20, backgroundColor: '#003366', alignItems: 'center' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  logoutBtn: { padding: 8, backgroundColor: '#ff4444', borderRadius: 5 },
  logoutText: { color: '#fff', fontWeight: 'bold' },
  content: { padding: 15 },
  metricsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  metricCard: { flex: 1, backgroundColor: '#fff', padding: 20, borderRadius: 8, marginHorizontal: 5, elevation: 2 },
  metricValue: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  metricLabel: { fontSize: 12, color: '#666', marginTop: 5 },
  powerBiPlaceholder: { height: 300, backgroundColor: '#e0e0e0', justifyContent: 'center', alignItems: 'center', borderRadius: 8, borderWidth: 1, borderColor: '#ccc', borderStyle: 'dashed' },
  powerBiText: { fontSize: 18, fontWeight: 'bold', color: '#555', textAlign: 'center' },
  powerBiSubText: { fontSize: 12, color: '#888', marginTop: 10, textAlign: 'center', paddingHorizontal: 20 }
});