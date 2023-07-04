import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import Logo from './Logo';

export default function HomeScreen({ navigation }) {

  const handleLogin = () => {
    navigation.navigate('Login');
  };
    
  return (
    <>
    <View style={styles.container}> 
    <Logo/>
  <ScrollView>
    <View style={styles.container}>    
      <StatusBar style="auto" />
      <Text>HomeScreen</Text>
    </View>
    <Button title="Back to Login" onPress={handleLogin} />
    </ScrollView>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  image: {
    width: 400, 
    height: 520,
  },
  buttoncontainer:
  {
    alignItems: 'stretch',
    marginLeft: 125,
  }
});