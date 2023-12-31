import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, Modal, TouchableOpacity, ImageBackground, Pressable, FlatList} from 'react-native';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { TextInput } from 'react-native-gesture-handler';
import CalendarPicker from 'react-native-calendar-picker';
import SelectCar from './SelectCar';

export default function HomeScreen({ navigation }) {

  //For Background Image
const image = require("../images/backbround.jpg");

const [date, setDate] = useState(new Date())
const [selectedStartDate, setSelectedStartDate] = useState(new Date())
const [selectedEndDate, setSelectedEndDate] = useState(new Date())
const [showStartDatePicker, setShowStartDatePicker] = useState(false);
const [showEndDatePicker, setShowEndDatePicker] = useState(false);

// To set start date : need to add this in table 
const handleStartDateChange = (date) => {
  setSelectedStartDate(date);
  setShowStartDatePicker(false);
};

// To set End Date : need to add this in table 
const handleEndDateChange = (date) => {
  setSelectedEndDate(date);
  setShowEndDatePicker(false);
};

useEffect(() => {
}, []);

const minDate = new Date(); // Today
const maxDate = new Date(2024, 12, 12);
const startDate  =  selectedStartDate ? selectedStartDate.toString() : '';
const endDate = selectedEndDate ? selectedEndDate.toString() : '';

// Car Data for Hot Deals 
const carData = [
  { id: '1', deals: '30% OFF', title: 'Audi', image: require('../images/audi.jpg'), rateperday:'$180 | Day', seat: '5 seat' },
  { id: '2', deals: '20% OFF', title: 'BMW', image: require('../images/bmw.jpg'), rateperday:'$70 | Day',  seat: '4 seat'},
  { id: '3', deals: '50% OFF', title: 'Dodge', image: require('../images/dodge.jpg'), rateperday:'$40 | Day', seat: '7 seat'},
  { id: '4', deals: '10% OFF', title: 'Fiat', image: require('../images/fiat.jpg'), rateperday:'$90 | Day', seat: '4 seat'},
  { id: '5', deals: '20% OFF', title: 'Ford', image: require('../images/ford.jpg'), rateperday:'$100 | Day', seat: '5 seat'},
  
];

// Hot Deal Each Box Template
const renderItem = ({ item }) => (
  <View style={styles.itemContainer}>
    <Text style={{color:'red'}}>{item.deals}</Text>
    <Text style={{fontSize: 16, fontWeight: '600'}}>{item.title}</Text>
    <Image source={item.image} style={styles.image1} />
    <Text style={{color: 'blue'}}>{item.rateperday}</Text>
  </View>
);

  

const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');

  // Address Data of our offices for Car Pick Up
  const data = ['5186 Québec 132, Sainte-Catherine, Montreal', 
                '279 Bd Sir Wilfrid Laurier, Mont-Saint-Hilaire, Montreal',
                '1279 Rue Saint Marc, Montréal', 
                '217 St Joseph, Montreal', 
                '68 Rue Court, Montreal', 
                '1551 Boulevard Shevchenko, Montreal', 
                '1370 Chemin Royal, Montreal',
                '97 Boul Cartier, Montreal'
              ];

  // To set selected Address for Pick up : need to add this in table 
  const handleItemPress = (item) => {
    setSelectedValue(item);
    setModalVisible(false);
  };

  // Validation of all the data and end date should be after start date.
  const handleBookCar = () => {
    if (!selectedValue) {
      alert('Please select a pick-up location.');
      return;
    }

    if (!selectedStartDate) {
      alert('Please select a trip start date.');
      return;
    }

    if (!selectedEndDate) {
      alert('Please select a trip end date.');
      return;
    }
    if (selectedEndDate <= selectedStartDate) {
      alert('End date should be after the start date.');
      return;
    }
    navigation.navigate('SelectCar', {selectedValue, startDate, endDate});
  };


  return (
    <View style={styles.container}>
      <Logo/>
      <ScrollView>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <View style={styles.containerselect}>

      <Text style={styles.text}>Own a car without actually buying it. So book now...</Text>

      <Text style={styles.textcontainerselect} >Select Pick-up Location</Text>

      <TouchableOpacity onPress={() => setModalVisible(true)}>
      <TextInput style= {styles.textinputselect} 
        placeholder='Select Location' 
        placeholderTextColor="white"
        value={selectedValue}
        editable={false}>
        </TextInput>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            {data.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.modalItem}
                onPress={() => handleItemPress(item)}
              >
                <Text>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
      
      <Text style={styles.textcontainerselect}>Start Trip</Text>

      <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
        <TextInput
          style={styles.textinputselect}
          placeholder="Select Trip Start Date"
          placeholderTextColor="white"
          value={selectedStartDate ? selectedStartDate.toString() : ''}
          editable={false}
        />
      </TouchableOpacity>

      <Modal visible={showStartDatePicker} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CalendarPicker
              onDateChange={handleStartDateChange}
              minDate={minDate}
              maxDate={maxDate}
              selectedDayStyle={{ backgroundColor: 'white', borderRadius: 16 }}
            />
          </View>
        </View>
      </Modal>

      <Text style={styles.textcontainerselect}>End Trip</Text>
      
      <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
        <TextInput
          style={styles.textinputselect}
          placeholder="Select Trip End Date"
          placeholderTextColor="white"
          value={selectedEndDate ? selectedEndDate.toString() : ''}
          editable={false}
        />
      </TouchableOpacity>

      <Modal visible={showEndDatePicker} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CalendarPicker
              onDateChange={handleEndDateChange}
              minDate={minDate}
              maxDate={maxDate}
            />
          </View>
        </View>
      </Modal>

      <Pressable style={styles.buttonselect} onPress={handleBookCar}>
     
      <Text style={styles.textselect}>Book Car</Text>
    </Pressable>
      </View>
    </ImageBackground>

    <Text style={styles.titlehotdeal}>Hot Deals</Text>
    <FlatList
      data={carData}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.flatListContainer}
      horizontal 
      showsHorizontalScrollIndicator={false} 
    />

    <StatusBar style="auto" />
    </ScrollView>
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
  image: {
    width: 400, 
    height: 420,
  },
  containerselect:{
    marginLeft: 10,
    marginTop: 20,
    marginRight: 10,

  },  
  text:{
    color: '#fff',
    fontWeight: 400,
    backgroundColor: '#000000c0',
    fontSize: 22,
  },
  textcontainerselect: {
    color: '#fff',
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
    borderColor: '#ccc',
    color: "white",
    borderWidth: 1,
    borderRadius: 15, 
    fontSize: 16,
    marginLeft: 10,
    marginTop: 5,
  },
  buttonselect: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 4,
    backgroundColor: 'white',
    width: 150,
    height: 40,
    marginLeft: 110,
    marginTop: 25,
  },
  textselect: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingVertical: 10,
  },
  modalItem: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  flatListContainer: {
    paddingHorizontal: 16,
  },
  itemContainer: {
    alignItems: 'center',
    padding: 16,
    marginRight: 8,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  image1: {
    width: 120,
    height: 120,

  },
  titlehotdeal:{
    fontSize: 20,
    fontWeight: '700',
    marginTop: 10,
  }

});