import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';
import Logo from './Logo';

const RegisterNew = ({ navigation }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [DOB, setDOB] = useState('');
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

  const handleRegister = () => {  
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
            console.log('Info before register:', customersToUpdate);
            setFirstname(undefined);
            setLastname(undefined);
            setDOB(undefined);
            setUsername(undefined);
            setPassword(undefined);
          },
          (txObj, error) => console.log('Error', error)
        );
      });
      
    };
    

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
            <Logo/>
            <Text>First name</Text>
            <TextInput
            placeholder="First name"
            value={firstname}
            onChangeText={setFirstname}
            style={styles.namestyle}
            />
            <Text>Last name</Text>
            <TextInput
            placeholder="Last name"
            value={lastname}
            onChangeText={setLastname}
            style={styles.namestyle}
            />
            <Text>Date of birth</Text>
            <TextInput
            placeholder="Date of birth"
            value={DOB}
            onChangeText={setDOB}
            style={styles.namestyle}
            />
            <Text>User name</Text>
            <TextInput
            placeholder="User name"
            value={username}
            onChangeText={setUsername}
            style={styles.namestyle}
            />
            <Text>Password</Text>
            <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.namestyle}
            />
      <Button title="Register" onPress={handleRegister} />
      <Button title="Back to Login" onPress={handleLogin} />
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
  button:
  {
    marginTop: 50,
  },
});

export default RegisterNew;
