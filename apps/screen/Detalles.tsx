import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Product } from './model/Products';
import { StackNavigationProp } from '@react-navigation/stack';
import { useEffect, useState } from 'react';
import { RootStackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import LocalDB from './persistance/localdb';

export type Params = {
  product: Product;
};

export type Props = {
  route: RouteProp<RootStackParamList, 'Detalles'>;
  navigation: StackNavigationProp<RootStackParamList, 'Detalles'>;
};

function Detalles({ route, navigation }: Props): React.JSX.Element {
  const [product, setProduct] = useState<Product>();
  const [moviminetos, setmoviminetos] = useState<any[]>();

  useEffect(() => {
    setProduct(route.params.product);

    LocalDB.init();
    navigation.addListener('focus', async () => {
      const db = await LocalDB.connect();
      db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM Movimientos WHERE fk_producto = ?',
          [route.params.product?.id],
          (_, res) => {
            setmoviminetos(res.rows.raw()); console.log(res.rows.raw());
          },
          error => console.error({ error }),
        );
      });
    });
  }, [route, navigation]);




  const productItem = ({ item }: { item: any }) => (
    <View style={{ flexDirection: 'row' }}>
      <Text>  {item.id}</Text>
      <Text>  {item.fk_producto}</Text>
      <Text>  {item.cantidad}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      {product && (
        <View>
          <Text style={styles.header}>{product.nombre}</Text>
          <Text>Precio: ${product.precio}</Text>
          <Text>Stock Min: {product.minStock}</Text>
          <Text>Stock Max: {product.maxStock}</Text>
          <Text>Stock Minimo: {product.currentStock}</Text>
        </View>


      )}

      <FlatList
        data={moviminetos}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 25,
  },
});
export default Detalles;
