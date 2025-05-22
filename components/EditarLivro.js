import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import firebase from '../config/config';

export default class EditarLivro extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props.livro
    };
  }

  salvarAlteracoes = () => {
    const { usuario, onSalvar } = this.props;
    const { id, titulo, autor } = this.state;

    if (!titulo.trim() || !autor.trim()) {
      Alert.alert('Erro', 'Preencha título e autor');
      return;
    }

    firebase.database().ref(`/usuarios/${usuario.uid}/livros/${id}`)
      .update(this.state)
      .then(() => {
        Alert.alert('Sucesso', 'Livro atualizado!');
        onSalvar(this.state);
      })
      .catch(erro => Alert.alert('Erro', erro.message));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Editar Livro</Text>
        
        <TextInput
          style={styles.input}
          placeholder="Título"
          value={this.state.titulo}
          onChangeText={titulo => this.setState({ titulo })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={this.state.autor}
          onChangeText={autor => this.setState({ autor })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Data de Início (DD/MM/AAAA)"
          value={this.state.dataInicio}
          onChangeText={dataInicio => this.setState({ dataInicio })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Data de Fim (DD/MM/AAAA)"
          value={this.state.dataFim}
          onChangeText={dataFim => this.setState({ dataFim })}
        />
        
        <TextInput
          style={styles.input}
          placeholder="Páginas"
          keyboardType="numeric"
          value={this.state.paginas}
          onChangeText={paginas => this.setState({ paginas })}
        />
        
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Comentários"
          multiline
          value={this.state.comentarios}
          onChangeText={comentarios => this.setState({ comentarios })}
        />
        
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Citações"
          multiline
          value={this.state.citacoes}
          onChangeText={citacoes => this.setState({ citacoes })}
        />
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={this.props.onVoltar}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]}
            onPress={this.salvarAlteracoes}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: '#2e8b57',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    padding: 15,
    borderRadius: 10,
    width: '48%',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  saveButton: {
    backgroundColor: '#2e8b57',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});