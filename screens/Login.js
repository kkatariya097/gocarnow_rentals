import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, TextInput, Alert, Pressable} from 'react-native';
import { useEffect, useState } from 'react';
import * as SQLite from 'expo-sqlite';
import RegisterNew from './RegisterNew'

import Logo from './Logo';



const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [customers, setCustomers] = useState([]);
    const db = SQLite.openDatabase('gocarnow.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, dob TEXT, username TEXT, password TEXT)');
    });
    db.transaction(tx => {
      const SuccessLoadingGoCarNow = (txObj, resultSet) =>
        setCustomers(resultSet.rows._array);
      const errorLoadingGoCarNow = (txObj, error) =>
        console.log('Error, ', error);
      tx.executeSql(
        'SELECT * FROM customers', // SQL Statement
        null,                      // Args
        SuccessLoadingGoCarNow, // Success callback
        errorLoadingGoCarNow    // Error callback
      );
    });  
  }, []);

  // Check for the customer in customer table: Currently Bypassing this value
    const handleLogin = () => {  
      //   db.transaction((tx) => {
      //     tx.executeSql(
      //       'SELECT password FROM customers WHERE username = ?',
      //       [username],
      //       (txObj, resultSet) => {
      //         if (resultSet.rowsAffected > 0) {
      //           const customersToCheck = [...customers]
      //           const index = customers.findIndex(
      //             (customer) => customer.username === username
      //           );
      //           if (customersToCheck[index].password == {password}){
      //             navigation.navigate('HomeScreen');   
      //           }else{
      //             Alert.alert('Error','Wrong user name or password')
      //           }
      //       }},
      //       (txObj, error) => console.log('Error', error)
      //     );
      //   });
      // }
      if (username == 'vanier' && password == '123') {
        navigation.navigate('HomeScreen');
      } else {
        Alert.alert('Error','Wrong user name or password')
      }
      
      console.log('Login', username, password);
    };
  
    // Go to RegisterNow Page
    const handleRegister = () => {
      navigation.navigate('RegisterNew');
    };

    
    
  return (
    <View style={styles.container}>
      <Logo/>
            <Text style={styles.titleLogin}>Login Page</Text>
            <TextInput
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.namestyle}
            />

            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.namestyle}
            />
            <Pressable style={styles.buttonselect} onPress={handleLogin}>
            <Text style={styles.textselect}>Login</Text>
            </Pressable>
            <Text style={styles.title1}> Don't have account? </Text>
            <Pressable style={styles.buttonselect} onPress={handleRegister}>
            <Text style={styles.textselect}>Register Now</Text>
            </Pressable>

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
    marginBottom: 20,
  },
  image: {
    width: 350, 
    height: 150,
  },
  titleLogin:{
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
    paddingBottom: 20,
  },
  buttonselect: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: 'black',
    width: 150,
    height: 40,
    marginLeft: 10,
    marginTop: 25,
  },
  textselect: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  title1:{
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
  }
});

export default Login;