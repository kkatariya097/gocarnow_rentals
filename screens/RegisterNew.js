import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, Pressable, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Logo from './Logo';

const RegisterNew = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [DOB, setDOB] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [customers, setCustomers] = useState([]);

  //Database Name: gocarnow.db
  const db = SQLite.openDatabase('gocarnow.db');

  //Table name: customers
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

  // When user register of the first time: Data insertion in customers table
  const handleRegister = () => { 
    //Validation
    if (!firstname || !lastname || !DOB || !username || !password) {
      Alert.alert('Error', 'All fields are required');
      return;
    }
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO customers (firstname, lastname, dob, username, password) VALUES (?,?,?,?,?)',
          [firstname, lastname, DOB, username, password],
          (txObj, resultSet) => {
            const customersToUpdate = [...customers];
            customersToUpdate.push({
              id: resultSet.insertId,
              firstname: firstname,
              lastname: lastname,
              dob: DOB,
              username: username,
              password: password,
            });
            setCustomers(customersToUpdate);
            Alert.alert('Success', 'Customer registered successfully.');
            setFirstname(undefined);
            setLastname(undefined);
            setDOB(undefined);
            setUsername(undefined);
            setPassword(undefined);
            {handleLogin()};
          },
          (txObj, error) => console.log('Error', error)
        );
      });
      
    };
    
// Go to Login Page
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
            <Logo/>
            <Text style={styles.titleLogin}>Register</Text>
            <Text style={styles.title1}>First name</Text>
            <TextInput
            placeholder="First name"
            value={firstname}
            onChangeText={setFirstname}
            style={styles.namestyle}
            />
            <Text style={styles.title1}>Last name</Text>
            <TextInput
            placeholder="Last name"
            value={lastname}
            onChangeText={setLastname}
            style={styles.namestyle}
            />
            <Text style={styles.title1}>Date of birth</Text>
            <TextInput
            placeholder="Date of birth"
            value={DOB}
            onChangeText={setDOB}
            style={styles.namestyle}
            />
            <Text style={styles.title1}>User name</Text>
            <TextInput
            placeholder="User name"
            value={username}
            onChangeText={setUsername}
            style={styles.namestyle}
            />
            <Text style={styles.title1}>Password</Text>
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.namestyle}
            />
            <Pressable style={styles.buttonselect} onPress={handleRegister}>
            <Text style={styles.textselect}>Register</Text>
            </Pressable>
            <Pressable style={styles.buttonselect} onPress={handleLogin}>
            <Text style={styles.textselect}>Back</Text>
            </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  titleLogin:{
    fontSize: 20,
    fontWeight: '700',
    marginTop: 5,
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
    marginBottom: 5,
  },
  button:
  {
    marginTop: 50,
  },
  title1:{
    fontSize: 18,
    fontWeight: '400',
    marginTop: 20,
    marginRight: 210,
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
});

export default RegisterNew;
