import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Button, View, Image, Text, ScrollView, Modal, TouchableOpacity, ImageBackground, Pressable} from 'react-native';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { TextInput } from 'react-native-gesture-handler';


export default function HomeScreen({ navigation }) {

const image = require("../images/backbround.jpg");

  

const [modalVisible, setModalVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const data = ['5186 Québec 132, Sainte-Catherine, Montreal', '279 Bd Sir Wilfrid Laurier, Mont-Saint-Hilaire, Montreal', '1279 Rue Saint Marc, Montréal', '217 St Joseph, Montreal', '68 Rue Court, Montreal', '1551 Boulevard Shevchenko, Montreal', '1370 Chemin Royal, Montreal','97 Boul Cartier, Montreal'];

  const handleItemPress = (item) => {
    setSelectedValue(item);
    setModalVisible(false);
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
      <TextInput style= {styles.textinputselect} placeholder='Select Trip Start Date' placeholderTextColor="white">  </TextInput>
    
      <Text style={styles.textcontainerselect}>End Trip</Text>
      <TextInput style= {styles.textinputselect} placeholder='Select Trip End Date'placeholderTextColor="white"></TextInput>
      <Pressable style={styles.buttonselect} >
     
      <Text style={styles.textselect}>Book Car</Text>
    </Pressable>
      </View>
    </ImageBackground>
    </ScrollView>
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

});