import { Image, View } from "react-native";

//Logo Display File
export default function Logo() {
  return (
    <View style={{ backgroundColor: "#050A30" }}>
      <Image
        source={require("../images/Logo.jpg")}
        style={{ width: 350, height: 150, alignContent: "center" }}
      />
    </View>
  );
}
