import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Button,
  Text,
} from 'react-native';
import React, {useState} from 'react';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#c0c0c040',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },

  screen: {
    height: '100%',
    backgroundColor: '#323844',
    justifyContent: 'center',
    alignContent: 'center',
  },

  TextInput: {
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '80%',
    margin: 8,
  },
});

function Login(): React.JSX.Element {
  const [usuario, setUsuario] = useState('');
  const [contrasena, setContrasena] = useState('');
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text>Iniciar Sesión</Text>
        <TextInput
          style={styles.TextInput}
          placeholder="Usuario"
          placeholderTextColor="#828894"
          onChangeText={u => setUsuario(u)}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Contraseña"
          placeholderTextColor="#828894"
          secureTextEntry={true}
          onChangeText={p => setContrasena(p)}
        />
        <Button title="Ingresar" />
      </View>
    </SafeAreaView>
  );
}

export default Login;
