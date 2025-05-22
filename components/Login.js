import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import firebase from '../config/config';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      senha: '',
    };
  }

  fazerLogin = () => {
    const { email, senha } = this.state;
    firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((userCredential) => {
        this.props.onLogin(userCredential.user);
      })
      .catch(erro => alert(erro.message));
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.logo}>Meu Leitor</Text>
        
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ email: text })}
            value={this.state.email}
          />
        </View>
        
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Senha"
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({ senha: text })}
            value={this.state.senha}
          />
        </View>
        
        <TouchableOpacity style={styles.loginBtn} onPress={this.fazerLogin}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={this.props.onCadastro}>
          <Text style={styles.signupText}>Criar nova conta</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5dc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#2e8b57',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#2e8b57',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
  signupText: {
    color: '#2e8b57',
    marginTop: 15,
  },
});