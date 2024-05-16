import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { Product } from './model/Products';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { RootStackParamList } from '../../App';
import LocalDB from './persistance/localdb';

type HomeScreenProps = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRoute = RouteProp<RootStackParamList, 'Home'>;

type HomeProps = {
  navigation: HomeScreenProps;
  route: HomeScreenRoute;
};

function Home({ navigation }: HomeProps): React.JSX.Element {
  const [products, setProducts] = useState<Product[]>([]);
  const productItem = ({ item }: { item: Product }) => (
    <TouchableOpacity
      style={styles.productItem}
      onLongPress={() => navigation.push('AddMovimentio', { product: item.id })}
      onPress={() => navigation.push('Detalles', { product: item })}>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', flexGrow: 9 }}>
          <Text style={styles.itemTitle}>{item.nombre}</Text>
          <Text style={styles.itemDetails}>
            Precio: ${item.precio.toFixed(2)}
          </Text>
        </View>
        <Text
          style={[
            styles.itemBadge,
            item.currentStock < item.minStock ? styles.itemBadgeError : null,
          ]}>
          {item.currentStock}
        </Text>
      </View>
    </TouchableOpacity>
  );

  useEffect(() => {
    LocalDB.init();
    navigation.addListener('focus', async () => {
      const db = await LocalDB.connect();
      db.transaction(async tx => {
        tx.executeSql(
          'SELECT * FROM productos',
          [],
          (_, res) => setProducts(res.rows.raw()),
          error => console.error({ error }),
        );
      });
    });
  }, [navigation]);

  return (
    <SafeAreaView>
      <FlatList
        data={products}
        renderItem={productItem}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  productItem: {
    padding: 12,
    borderBottomColor: '#c0c0c0',
    borderBottomWidth: 1,
    backgroundColor: 'white',
  },
  itemTitle: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    // textTransform: 'uppercase',
  },
  itemDetails: {
    fontSize: 14,
    opacity: 0.7,
  },
  itemBadge: {
    fontSize: 24,
    color: 'blue',
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  itemBadgeError: {
    color: 'red',
  },
});

export default Home;
