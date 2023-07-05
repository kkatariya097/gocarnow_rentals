import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, Modal, TouchableOpacity, ImageBackground, Pressable, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { TextInput } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import HomeScreen from './HomeScreen';


export default function ConfirmReservation({ navigation }) {

// Go to HomeScreen Page
const handleHomeScreen = () => {
    navigation.navigate('HomeScreen');
  };

  const handleUpdate = () => {
    navigation.navigate('HomeScreen');
  };


    return (
        <View style={styles.container}>
      <Logo/>
            <Text style={styles.titleLogin}>Reservtion Confirmed</Text>
            
            <Button title="HomeScreen" onPress={handleHomeScreen} />
            <Button title="Want to make changes? No Worries" onPress={handleUpdate} />
      <StatusBar style="auto" />
      
    </View>
        );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    namestyle:
    {
      width: 300,
      height: 40,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 15,
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 15, 
      fontSize: 16,
      marginBottom: 10,
    },
    image: {
      width: 350, 
      height: 150,
    },
    titleLogin:{
      fontSize: 20,
      fontWeight: '700',
      marginTop: 10,
      paddingBottom: 10,
    },
  });
