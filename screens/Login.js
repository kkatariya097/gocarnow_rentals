import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, TextInput} from 'react-native';
import { useEffect, useState } from 'react';
import RegisterNew from './RegisterNew'

const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin = () => {
      // Handle login logic here
      console.log('Login', username, password);
    };
  
    const handleRegister = () => {
      navigation.navigate('RegisterNew');
    };
    
  return (
    <View style={styles.container}>
        <Image source={require('../images/Logo.jpg')} 
            style={styles.image}></Image>
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