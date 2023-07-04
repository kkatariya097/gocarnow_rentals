import React, { useEffect } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Logo from './Logo';

//Logo Screen Display for 2 seconds 
const TitlePage = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('HomeScreen');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Logo/>
      {/* // <Image source={require('../images/Logo.jpg')} 
      style={styles.image}
      /> */}
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
    },
    image: {
      width: 350, 
      height: 150,
    },
  });
  
export default TitlePage;