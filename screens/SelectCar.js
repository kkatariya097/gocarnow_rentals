import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Button,
  View,
  Image,
  Text,
  ScrollView,
  Modal,
  TouchableOpacity,
  ImageBackground,
  Pressable,
  FlatList,
} from "react-native";
import { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import Logo from "./Logo";
import { TextInput } from "react-native-gesture-handler";

export default function SelectCar({ navigation }) {
//   const image = require("../images/backbround.jpg");

  // Sample data for the FlatList
  const carData = [
    {
      id: "1",
      deals: "30% OFF",
      title: "Audi",
      image: require("../images/audi.jpg"),
      rateperday: "$180 | Day",
      seat: "5 seat",
    },
    {
      id: "2",
      deals: "20% OFF",
      title: "BMW",
      image: require("../images/bmw.jpg"),
      rateperday: "$70 | Day",
      seat: "4 seat",
    },
    {
      id: "3",
      deals: "50% OFF",
      title: "Dodge",
      image: require("../images/dodge.jpg"),
      rateperday: "$40 | Day",
      seat: "7 seat",
    },
    {
      id: "4",
      deals: "10% OFF",
      title: "Fiat",
      image: require("../images/fiat.jpg"),
      rateperday: "$90 | Day",
      seat: "4 seat",
    },
    {
      id: "5",
      deals: "20% OFF",
      title: "Ford",
      image: require("../images/ford.jpg"),
      rateperday: "$100 | Day",
      seat: "5 seat",
    },
    // Add more data as needed
  ];

  const [cars, setCars] = useState('');
  const [rate, setRate] = useState('');
  const [totalPrice, setTotalPrice] = useState('');
  const [username, setUsername] = useState('');
  const [reservations, setReservations] = useState([]);
  const db = SQLite.openDatabase('gocarnow.db');

  useEffect(() => {
    db.transaction((tx) => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS reservations (id INTEGER PRIMARY KEY AUTOINCREMENT, car TEXT, rate TEXT, totalprice TEXT, username TEXT)');
    });
    db.transaction(tx => {
      const SuccessLoadingGoCarNow = (txObj, resultSet) =>
        setCars(resultSet.rows._array);
      const errorLoadingGoCarNow = (txObj, error) =>
        console.log('Error, ', error);
      tx.executeSql(
        'SELECT * FROM reservations', // SQL Statement
        null,                      // Args
        SuccessLoadingGoCarNow, // Success callback
        errorLoadingGoCarNow    // Error callback
      );
    });  
  }, []);

  const showCars = () =>
    carData.map((car, index) => (
        <>
      <View key={index} className="row">
        <View className="row">
            <View className="col-6">
                <Text style={styles.textselect}>Car:</Text><Text>{car.title}</Text>
                <Text style={styles.textselect}>Rate:</Text><Text>{car.rateperday}</Text>
                <Text style={styles.textselect}>Number of seats:</Text><Text>{car.seat}</Text>
            </View>
            <View className="col-6">
                <Image source={car.image} style={styles.image1} />
            <Button
            title="Book"
            onPress={() => handleBook(car)}
            style={{ margin: 10 }}
            />
            </View>
      </View>
      </View>
      </>
    ));

    const handleBook = (car) => {
    db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO reservations (car, rate, totalprice, username) VALUES (?,?,?,?)',
          [car.title, car.rateperday, (car.rateperday*2), "vanier"],
          (txObj, resultSet) => {
            if (resultSet.rowsAffected > 0) {
              const productsToUpdate = [...products].filter(
                product => product.id !== id
              );
              setProducts(productsToUpdate);
            }
          },
          (txObj, error) => {
            console.log('Error', error);
          })
      })
    }


  return (
    <View style={styles.container}>
      <Logo />
      
            <Text style={styles.text}>
            Select your car...
            </Text>
        {/* </ImageBackground> */}
        <ScrollView>
        {/* <FlatList
          data={carData}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContainer}
          horizontal // Set the horizontal prop to true
          showsHorizontalScrollIndicator={true} // Optional: Hide horizontal scroll indicator
        /> */}
        {showCars()}
        <StatusBar style="auto" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  image: {
    width: 400,
    height: 420,
  },
  containerselect: {
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,
  },
  text: {
    color: "#fff",
    fontWeight: 400,
    backgroundColor: "#000000c0",
    fontSize: 22,
  },
  textcontainerselect: {
    color: "#fff",
    fontWeight: 400,
    fontSize: 15,
    marginTop: 20,
    marginLeft: 10,
    marginEnd: 5,
  },
  textinputselect: {
    width: 350,
    height: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  buttonselect: {
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: "white",
    width: 150,
    height: 40,
    marginLeft: 110,
    marginTop: 25,
  },
  textselect: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "black",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: "center",
    padding: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
  },
  image1: {
    width: 120,
    height: 120,
  },
  titlehotdeal: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 10,
    paddingBottom: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "space-between",
    margin: 10,
  },
});
