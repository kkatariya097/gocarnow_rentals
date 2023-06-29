import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Button } from 'react-native';

const RegisterNew = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Handle register logic here
    console.log('Register', username, password);
  };

  const handleLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
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
    justifyContent: 'center',
  },
  namestyle:
  {
    borderWidth: 1,
    padding: 10, 
    marginVertical: 10,
  }
});

export default RegisterNew;
