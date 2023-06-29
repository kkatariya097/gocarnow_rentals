import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View} from 'react-native';
import { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TitlePage from './screens/TitlePage';
import Login from './screens/Login';
import HomeScreen from './screens/HomeScreen';
import RegisterNew from './screens/RegisterNew';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName="Title" screenOptions={{ headerShown: false }}>
      <Stack.Screen 
        name="Title"
        component={TitlePage}
      />
      <Stack.Screen 
        name="Login"
        component={Login}
        options={{title: "Login"}}
      />
    <Stack.Screen 
        name="HomeScreen"
        component={HomeScreen}
        options={{title: "Home"}}
      />
      <Stack.Screen 
        name="RegisterNew"
        component={RegisterNew}
        options={{title: "Home"}}
      />

    </Stack.Navigator>
    
  </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
});
