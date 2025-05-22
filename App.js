import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import firebase from './config/config';

import LoginScreen from './screens/LoginScreen';
import RegistroScreen from './screens/RegistroScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [carregando, setCarregando] = React.useState(true);
  const [usuario, setUsuario] = React.useState(null);

  // Verifica se o usuário já está logado ao iniciar o app
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      setUsuario(user);
      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  if (carregando) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#2E8B57" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {usuario ? (
          // Telas quando o usuário ESTÁ logado (serão adicionadas no Commit 4)
          <Stack.Screen 
            name="ListaLivros" 
            component={() => <View><Text>Lista de Livros (em construção)</Text></View>} 
          />
        ) : (
          // Telas quando o usuário NÃO está logado
          <>
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }} // Esconde o cabeçalho
            />
            <Stack.Screen
              name="Registro"
              component={RegistroScreen}
              options={{ 
                title: 'Criar Conta',
                headerTintColor: '#2E8B57', // Cor do texto do cabeçalho
              }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}