import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import * as Linking from 'expo-linking';

// Import Screen
import LoginScreen from './src/screens/Login';
import HomeScreen from './src/screens/HomeScreen';         
import UserHomeScreen from './src/screens/UserHomeScreen'; 
import DetailScreen from './src/screens/DetailScreen';
import AddItemScreen from './src/screens/AddItemScreen';
import HistoryScreen from './src/screens/HistoryScreen';

const Stack = createNativeStackNavigator();

const prefix = Linking.createURL('/');

export default function App() {
  const linking = {
    // prefixes disesuaikan dengan domain vercel ochre kamu
    prefixes: [prefix, 'https://valorant-shop-ochre.vercel.app', 'valorantstore://'],
    config: {
      screens: {
        Login: 'login',
        Home: 'admin',
        UserHome: 'shop',
        HistoryScreen: 'history',
        AddItemScreen: 'add',
        DetailScreen: {
          path: 'product/:productId',
          parse: {
            productId: (id: string) => id,
          },
        },
      },
    },
  };

  return (
    <>
      <NavigationContainer linking={linking}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="UserHome" component={UserHomeScreen} options={{ headerShown: false }} />
          
          <Stack.Screen 
            name="DetailScreen" 
            component={DetailScreen} 
            options={{ 
              title: 'Detail Produk',
              headerStyle: { backgroundColor: '#f97316' },
              headerTintColor: '#fff',
            }} 
          />
          
          <Stack.Screen 
            name="AddItemScreen" 
            component={AddItemScreen} 
            options={{ 
              title: 'Tambah Produk',
              headerStyle: { backgroundColor: '#f97316' },
              headerTintColor: '#fff',
            }} 
          />

          <Stack.Screen 
            name="HistoryScreen" 
            component={HistoryScreen} 
            options={{ 
              title: 'Riwayat Transaksi',
              headerStyle: { backgroundColor: '#f97316' },
              headerTintColor: '#fff',
            }} 
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}