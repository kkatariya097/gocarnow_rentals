import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, TextInput, Alert} from 'react-native';
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
      // Handle login logic here
      console.log('Login', username, password);
    };
  
    const handleRegister = () => {
      navigation.navigate('RegisterNew');
    };
    
  return (
    <View style={styles.container}>
      <Logo/>
        {/* {/* <Image source={require('../images/Logo.jpg')} 
            style={styles.image}></Image> */}
            <Text>Login Page</Text>
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
            <Button title="Login" onPress={handleLogin} />
            <Button title="Register" onPress={handleRegister} />
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
    borderWidth: 1,
    padding: 10, 
    marginVertical: 10,
  },
  image: {
    width: 350, 
    height: 150,
  },
});

export default Login;