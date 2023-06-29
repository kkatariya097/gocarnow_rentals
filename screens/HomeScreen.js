import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';

export default function HomeScreen({ navigation }) {

    
  return (
  <ScrollView>
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>HomeScreen</Text>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'baseline',
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