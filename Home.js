import { StatusBar } from "expo-status-bar";
import { Button } from "react-native";
import Logo from "./Logo";

export default function Home({ navigation }) {
  return (
    <>
    <Logo/>
      <Button
        title="Login"
        onPress={() => navigation.navigate("Login")}
      />
      <Button
        title="Registration"
        onPress={() => navigation.navigate("Registration")}
      />
      <Button 
        title="About us" 
        onPress={() => navigation.navigate("AboutUs")} />
      <StatusBar style="auto" />
    </>
  );
}