import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { TextInput } from "react-native-gesture-handler";
import CalendarPicker from "react-native-calendar-picker";
import HomeScreen from "./HomeScreen";
import * as SQLite from "expo-sqlite";

export default function ConfirmReservation({ navigation, route }) {
  const [loading, setLoading] = useState(true);
  const [reservation, setReservation] = useState(route.params.carToInsert);
  const [allreservations, setAllreservations] = useState(route.params.reservations);
  const db = SQLite.openDatabase("gocarnow.db");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      console.log("Confirmed reservation?: ", reservation);
      console.log("All reservations?: ", allreservations);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  // Go to HomeScreen Page
  const handleHomeScreen = () => {
    navigation.navigate("HomeScreen");
  };

  const handleCancel = (id) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM reservations WHERE id = ?',
        [id],
        (txObj, resultSet) => {
          if (resultSet.rowsAffected > 0) {
            const reservationsToUpdate = [...allreservations].filter(
              reservation => reservation.id !== id
            );

            setAllreservations(reservationsToUpdate);
            // setReservation(undefined);
            console.log('After delete', allreservations);
            Alert.alert('Success', 'Reservation caceled.')
            navigation.navigate('HomeScreen');
          }
        },
        (txObj, error) => {
          console.log('Error', error);
        })
    })
  }

  const showReservation = () => 
    reservation.map((reservationObj, index) => (
      <View key={index} style={styles.modalItem}>
        <Text>Car:</Text>
        <Text style={styles.textselect}>{reservationObj.car}</Text>
        <Text>Total price:</Text>
        <Text style={styles.textselect}>{reservationObj.totalprice}</Text>
        <Text>Location:</Text>
        <Text style={styles.textselect}>{reservationObj.location}</Text>
        <Text>Start date:</Text>
        <Text style={styles.textselect}>{reservationObj.startdate}</Text>
        <Text>End date:</Text>
        <Text style={styles.textselect}>{reservationObj.enddate}</Text>
        <Image source={reservationObj.image} style={styles.image1} />
        <Pressable style={styles.buttonselect} onPress={() => handleCancel(reservationObj.id)}>
          <Text style={styles.textbutton}>Cancel reservation</Text>
        </Pressable>
      </View>
    ));

  if (loading) {
    return (
      <View style={styles.containerpayment}>
        <Logo />
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.titleLogin}>Proceeding Payment...</Text>
        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.text}>Reservation Confirmed</Text>
      <ScrollView>
        {showReservation()}
      </ScrollView>
      <Pressable style={styles.buttonselect} onPress={handleHomeScreen}>
        <Text style={styles.textbutton}>Home screen</Text>
      </Pressable>
      <StatusBar style="auto"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  namestyle: {
    width: 300,
    height: 40,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 350,
    height: 150,
  },
  titleLogin: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    paddingBottom: 10,
  },
  containerpayment: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonselect: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "black",
    width: "auto",
    height: 40,
    marginLeft: 30,
    marginTop: 25,
    marginBottom: 20,
  },
  textbutton: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  textselect: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  image1: {
    padding: 20,
    width: 120,
    height: 120,
  },
  text: {
    color: "#fff",
    fontWeight: 400,
    backgroundColor: "#000000c0",
    fontSize: 22,
  },
});
