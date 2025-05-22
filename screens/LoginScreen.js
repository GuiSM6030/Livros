import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../config/config';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const fazerLogin = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, senha);
      Alert.alert("Sucesso", "Login realizado!");
      // Redirecionar para a tela principal (será adicionada no Commit 4)
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Meu Leitor</Text>
      
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      
      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        style={styles.input}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.botao} onPress={fazerLogin}>
        <Text style={styles.textoBotao}>Entrar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Registro')}>
        <Text style={styles.textoLink}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#F5F5DC', // Bege claro
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2E8B57', // Verde escuro
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#3CB371', // Verde médio
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: 'white',
  },
  botao: {
    backgroundColor: '#2E8B57',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
  },
  textoLink: {
    marginTop: 15,
    color: '#3CB371',
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});