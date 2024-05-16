import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import localDB from './persistance/localdb';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';


export type Params = {
  product: number;
};

export type Props = {
  route: RouteProp<RootStackParamList, 'AddMovimentio'>;
  navigation: StackNavigationProp<RootStackParamList, 'AddMovimentio'>;
};


const AddMoviminetos = ({ route }: Props) => {
  const [cantidad, setcantidad] = useState('');

  const [product, setProduct] = useState<number>();
  useEffect(() => {
    setProduct(route.params.product);
  }, [route]);

  const guardarProducto = async () => {
    if (!cantidad) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {

      const res = await localDB.addMOvimiento({ producto: product!, cantidad: Number.parseInt(cantidad) });

      if (res) {

        Alert.alert('Éxito', 'Producto guardado exitosamente');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar el producto');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Agregar MOvimientos</Text>


        <TextInput
          style={styles.input}
          placeholder="cantidad"
          value={cantidad}
          onChangeText={setcantidad}
          keyboardType="numeric"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <TouchableOpacity style={styles.saveButton} onPress={guardarProducto}>
          <Text style={styles.saveButtonText}>Guardar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  formContainer: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: 'teal',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AddMoviminetos;
