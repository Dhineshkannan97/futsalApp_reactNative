import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLogInScreen from "./app/LoginScreen";
import DashboardScreen from "./app/DashBoard";
import UserRegisterScreen from "./app/RegisterScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { BackHandler } from "react-native";
import {  useCallback, useEffect, useState } from "react";
import ConfirmationPopup from "./components/LogoutConformationPopup";
import { RouteNavigationParam, UserData } from "./functions/types";
import { clearUserData, getUser } from "./functions/utils";
import * as Font from 'expo-font';
import { useFonts } from "expo-font";
import * as SplashScreen from 'expo-splash-screen';

const Stack = createNativeStackNavigator();
export default function App() {

  const [isConfirmationVisible, setConfirmationVisible] =
    useState<boolean>(false);
  const handleLogout = () => {
    setConfirmationVisible(true);
  };

  const handleConfirm = (navigation: RouteNavigationParam) => {
    clearUserData();
    BackHandler.exitApp();
    navigation.navigate("Login");
    setConfirmationVisible(false);
  };

  const handleCancel = () => {
    setConfirmationVisible(false);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: true,
          headerStyle: { backgroundColor: "#77FF47" },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: "black",
          },
        }}
      >
        <Stack.Screen name="Login" component={UserLogInScreen} />
        <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              style={{ marginRight: 15 }}
              onPress={() => {
                handleLogout();
                console.log("logout button clicked");
              }}
            >
              <Icon name="sign-out" size={24} color="black" />
              <ConfirmationPopup
                isVisible={isConfirmationVisible}
                onConfirm={() => handleConfirm(navigation)}
                onCancel={handleCancel}
              />
            </TouchableOpacity>
          ),
        })}
      /> 
       
        <Stack.Screen name="Register" component={UserRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({//no need 
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontFamily: 'inter-regular', // Use the font family name here
    fontSize: 16,
    // Other text styles
  },
});
