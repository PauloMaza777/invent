import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from './apps/screen/Home';
import Login from './apps/screen/Login';
import Detalles, {Params as ProductDetailsParams} from './apps/screen/Detalles';
import ProducAdd from './apps/screen/ProductAdd';
import {Button} from 'react-native';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Detalles: ProductDetailsParams;
  ProductAdd: undefined;
};

function HomeHeader(): React.JSX.Element {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <Button title="Agregar" onPress={() => navigation.navigate('ProductAdd')} />
  );
}

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            headerStyle: {backgroundColor: '#ffa000'},
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerRight: HomeHeader,
          }}
        />
        <Stack.Screen name="Detalles" component={Detalles} />
        <Stack.Screen name="ProductAdd" component={ProducAdd} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
