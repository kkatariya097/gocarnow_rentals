import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
} from "react-native";
import Logo from "./Logo";
import LogoVanier from "./LogoVanier";

const AboutUs = ({ navigation }) => {

  // Go to Login Page
  const handleLogin = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.container}>
      <Logo />
      <LogoVanier />
      <Text style={styles.text}>About us...</Text>
      <Text style={styles.title1}>
        This project is to show our skills and knowledge in React-native for the
        subject Mobile applications.
      </Text>
      <Text style={styles.title1}>
        The team is formed by: 
      </Text>
      <Text style={styles.title1}>
        Kavya Katariya
      </Text>
      <Text style={styles.title1}>
        &
      </Text>
      <Text style={styles.title1}>
        Roberto Benitez
      </Text>
      <Pressable style={styles.buttonselect} onPress={handleLogin}>
        <Text style={styles.textselect}>Back</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 50,
  },
  title1: {
    fontSize: 18,
    fontWeight: "400",
    padding: 10,
  },
  buttonselect: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "black",
    width: 150,
    height: 40,
    marginLeft: 10,
    marginTop: 25,
  },
  textselect: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  text: {
    color: "#fff",
    fontWeight: 400,
    backgroundColor: "#000000c0",
    fontSize: 22,
  },
});

export default AboutUs;
