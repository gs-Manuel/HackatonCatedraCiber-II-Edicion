import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import LoginScreen from './src/screens/LoginScreen';
import CEODashboard from './src/screens/CEODashboard';
import CISODashboard from './src/screens/CISODashboard';

export default function App() {
  const [userRole, setUserRole] = useState(null);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={userRole === 'CEO' ? 'dark-content' : 'light-content'} />
      {!userRole ? (
        <LoginScreen onLogin={setUserRole} />
      ) : userRole === 'CEO' ? (
        <CEODashboard onLogout={() => setUserRole(null)} />
      ) : (
        <CISODashboard onLogout={() => setUserRole(null)} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
