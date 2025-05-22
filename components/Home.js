import * as React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../config/config';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      livros: []
    };
  }

  componentDidMount() {
    this.carregarLivros();
  }

  carregarLivros = () => {
    const { usuario } = this.props;
    if (usuario) {
      firebase.database().ref(`/usuarios/${usuario.uid}/livros`)
        .on('value', snapshot => {
          const livros = [];
          snapshot.forEach(livro => {
            livros.push({
              id: livro.key,
              ...livro.val()
            });
          });
          this.setState({ livros });
        });
    }
  };

  renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.item}
      onPress={() => this.props.onVerDetalhes(item)}>
      <Text style={styles.titulo}>{item.titulo}</Text>
      <Text style={styles.autor}>{item.autor}</Text>
      <Text style={styles.dates}>
        {item.dataInicio ? `Início: ${item.dataInicio}` : ''}
        {item.dataFim ? ` - Fim: ${item.dataFim}` : ''}
      </Text>
    </TouchableOpacity>
  );

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Meus Livros</Text>
        
        {this.state.livros.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Nenhum livro cadastrado ainda</Text>
          </View>
        ) : (
          <FlatList
            data={this.state.livros}
            renderItem={this.renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            style={styles.list}
          />
        )}
        
        {/* Floating Action Button */}
        <TouchableOpacity
          style={styles.addButton}
          onPress={this.props.onAdicionarLivro}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        
        {/* Logout Button */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={this.props.onLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    color: '#2e8b57',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2e8b57',
    marginBottom: 5,
  },
  autor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  dates: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  list: {
    flex: 1,
    marginBottom: 70, // Space for buttons
  },
  listContent: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  addButton: {
    position: 'absolute',
    right: 25,
    bottom: 80,
    backgroundColor: '#2e8b57',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 30,
    lineHeight: 30,
  },
  logoutButton: {
    position: 'absolute',
    left: 25,
    bottom: 25,
    backgroundColor: '#8fbc8f',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});