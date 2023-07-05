import {Image, View } from "react-native";
//This functions stores the funcitonality to display the logo
export default function LogoVanier() {
  return (
    <View style={{ backgroundColor: "red" }}>
      <Image
        source={{
          uri: "https://www.vaniercollege.qc.ca/wp-content/themes/vaniermain/images/logo.png",
        }}
        style={{ width: 200, height: 60, alignContent: "center", margin: 5 }}
      />
    </View>
  );
}