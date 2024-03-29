import { StatusBar } from 'expo-status-bar';
import { Button, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DetailsScreen from './screens/DetailsScreen';
import HomeScreen from './screens/HomeScreen';
import FlightRouteScreen from './screens/FlightRouteScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name='Home'
          component={HomeScreen}
        />
        <Stack.Screen 
          name='Details'
          component={DetailsScreen}
        />
        <Stack.Screen 
          name='FlightRoute'
          component={FlightRouteScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
