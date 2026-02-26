import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'ceo' && password === 'ceo123') {
      onLogin('CEO');
    } else if (username === 'ciso' && password === 'ciso123') {
      onLogin('CISO');
    } else {
      Alert.alert('Error', 'Credenciales incorrectas. Usa ceo/ceo123 o ciso/ciso123');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CyberSec Portal</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput 
          style={styles.input} 
          value={username} 
          onChangeText={setUsername} 
          autoCapitalize="none"
          placeholder="Ingresa tu usuario"
          placeholderTextColor="#666"
        />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput 
          style={styles.input} 
          value={password} 
          onChangeText={setPassword} 
          secureTextEntry 
          placeholder="Ingresa tu contraseña"
          placeholderTextColor="#666"
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Ingresar</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.hint}>Perfiles: ceo/ceo123 | ciso/ciso123</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#121212' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#00ffcc', marginBottom: 30 },
  card: { width: '85%', backgroundColor: '#1e1e1e', padding: 20, borderRadius: 10, elevation: 5 },
  label: { color: '#aaa', marginBottom: 5 },
  input: { backgroundColor: '#2c2c2c', color: '#fff', padding: 10, borderRadius: 5, marginBottom: 15 },
  button: { backgroundColor: '#00ffcc', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold', fontSize: 16 },
  hint: { color: '#555', marginTop: 20 }
});