import React, {useState} from 'react';
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

const ProductAdd: React.FC = () => {
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');
  const [minStock, setMinStock] = useState('');
  const [maxStock, setMaxStock] = useState('');

  const guardarProducto = async () => {
    if (!nombre || !precio || !minStock || !maxStock) {
      Alert.alert('Error', 'Por favor complete todos los campos');
      return;
    }

    try {
      const db = await localDB.connect();
      await db.executeSql(
        'INSERT INTO productos (nombre, precio, minStock, currentStock, maxStock) VALUES (?, ?, ?, 0, ?)',
        [nombre, parseFloat(precio), parseInt(minStock), parseInt(maxStock)],
      );
      Alert.alert('Éxito', 'Producto guardado exitosamente');
      // Restablece los valores después de guardar
      setNombre('');
      setPrecio('');
      setMinStock('');
      setMaxStock('');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un error al guardar el producto');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>Agregar Producto</Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre del producto"
          value={nombre}
          onChangeText={setNombre}
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <TextInput
          style={styles.input}
          placeholder="Precio"
          value={precio}
          onChangeText={setPrecio}
          keyboardType="numeric"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <TextInput
          style={styles.input}
          placeholder="Stock mínimo"
          value={minStock}
          onChangeText={setMinStock}
          keyboardType="numeric"
          placeholderTextColor="rgba(0, 0, 0, 0.5)"
        />

        <TextInput
          style={styles.input}
          placeholder="Stock máximo"
          value={maxStock}
          onChangeText={setMaxStock}
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

export default ProductAdd;
