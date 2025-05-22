import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../config/config';

export default function DetalhesLivro(props) {
  const { livro, onVoltar, onEditar } = props;

  const excluirLivro = () => {
    Alert.alert(
      'Confirmar exclusão',
      `Tem certeza que deseja excluir permanentemente "${livro.titulo}"?`,
      [
        { 
          text: 'Cancelar', 
          style: 'cancel' 
        },
        { 
          text: 'Excluir', 
          onPress: confirmarExclusao,
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  const confirmarExclusao = () => {
    const usuario = firebase.auth().currentUser;
    if (usuario && livro.id) {
      firebase.database().ref(`/usuarios/${usuario.uid}/livros/${livro.id}`)
        .remove()
        .then(() => {
          Alert.alert('Sucesso', 'Livro excluído com sucesso!');
          onVoltar(); // Volta para a tela Home
        })
        .catch(erro => {
          console.error('Erro ao excluir:', erro);
          Alert.alert('Erro', 'Não foi possível excluir o livro:\n' + erro.message);
        });
    } else {
      Alert.alert('Erro', 'Nenhum usuário autenticado ou livro inválido');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVoltar} style={styles.backButton}>
        <Text style={styles.backButtonText}>← Voltar para lista</Text>
      </TouchableOpacity>
      
      <Text style={styles.titulo}>{livro.titulo}</Text>
      <Text style={styles.autor}>por {livro.autor}</Text>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Início da leitura</Text>
          <Text style={styles.infoText}>{livro.dataInicio || 'Não informado'}</Text>
        </View>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoLabel}>Término da leitura</Text>
          <Text style={styles.infoText}>{livro.dataFim || 'Não informado'}</Text>
        </View>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoLabel}>Páginas lidas</Text>
        <Text style={styles.infoText}>{livro.paginas || 'Não informado'}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Minhas anotações</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>
            {livro.comentarios || 'Nenhuma anotação adicionada'}
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Citações favoritas</Text>
        <View style={styles.sectionContent}>
          <Text style={styles.sectionText}>
            {livro.citacoes || 'Nenhuma citação salva'}
          </Text>
        </View>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={onEditar}>
          <Text style={styles.buttonText}>✏️ Editar</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={excluirLivro}>
          <Text style={styles.buttonText}>🗑️ Excluir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    padding: 20,
  },
  backButton: {
    marginBottom: 25,
    padding: 10,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#2e8b57',
    fontSize: 16,
    fontWeight: '600',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 5,
    textAlign: 'center',
  },
  autor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#2e8b57',
    marginBottom: 10,
  },
  sectionContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  editButton: {
    backgroundColor: '#2e8b57',
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});