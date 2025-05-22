import * as React from 'react';
import { View } from 'react-native';
import Login from './components/Login';
import Cadastro from './components/Cadastro';
import Home from './components/Home';
import AdicionarLivro from './components/AdicionarLivro';
import DetalhesLivro from './components/DetalhesLivro';
import EditarLivro from './components/EditarLivro';

export default function App() {
  const [telaAtual, setTelaAtual] = React.useState('Login');
  const [usuario, setUsuario] = React.useState(null);
  const [livroSelecionado, setLivroSelecionado] = React.useState(null);

  const fazerLogin = (user) => {
    setUsuario(user);
    setTelaAtual('Home');
  };

  const fazerLogout = () => {
    setUsuario(null);
    setTelaAtual('Login');
  };

  const atualizarLivro = (livroAtualizado) => {
    setLivroSelecionado(livroAtualizado);
    setTelaAtual('DetalhesLivro');
  };

  return (
    <View style={{ flex: 1 }}>
      {telaAtual === 'Login' && (
        <Login 
          onLogin={fazerLogin} 
          onCadastro={() => setTelaAtual('Cadastro')} 
        />
      )}
      
      {telaAtual === 'Cadastro' && (
        <Cadastro 
          onCadastroSucesso={fazerLogin} 
          onVoltar={() => setTelaAtual('Login')} 
        />
      )}
      
      {telaAtual === 'Home' && (
        <Home 
          usuario={usuario} 
          onLogout={fazerLogout}
          onAdicionarLivro={() => setTelaAtual('AdicionarLivro')}
          onVerDetalhes={(livro) => {
            setLivroSelecionado(livro);
            setTelaAtual('DetalhesLivro');
          }}
        />
      )}

      {telaAtual === 'AdicionarLivro' && (
        <AdicionarLivro 
          usuario={usuario}
          onVoltar={() => setTelaAtual('Home')}
        />
      )}

      {telaAtual === 'DetalhesLivro' && (
        <DetalhesLivro 
          livro={livroSelecionado}
          onVoltar={() => setTelaAtual('Home')}
          onEditar={() => setTelaAtual('EditarLivro')}
        />
      )}

      {telaAtual === 'EditarLivro' && (
        <EditarLivro 
          livro={livroSelecionado}
          usuario={usuario}
          onVoltar={() => setTelaAtual('DetalhesLivro')}
          onSalvar={atualizarLivro}
        />
      )}
    </View>
  );
}