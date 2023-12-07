import { RouteNavigationParam, UserData } from "../functions/types";
import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Keyboard, Platform } from "react-native";
import { TextEdit } from "../components/TextEdit";
import CustomButton from "../components/CustomButton";
import { apiGetUserData } from "../functions/api";
import Toast from "react-native-root-toast";
import { KeyboardAvoidingView } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { USERNAME_EXISTS, USER_REGISTERED } from "../constant";

// Functional component for User Registration Screen
export default function UserRegisterScreen({
  navigation,
}: RouteNavigationParam) {
  const [userName, setUserName] = useState<String>("");
  const [password, setPassword] = useState<String>("");
  const [confirmPassword, setConfirmPassword] = useState<String>("");
  // Function to handle registration button press
  const handleRegisterButton = async () => {
    // sendPostRequest(userName,password);
    // sendPostRequestAlternative(userName,password);
    // navigation.navigate("Login")
    console.log("userName >>>>>", userName);
    console.log("password >>>>>", password);
    console.log("confirmPassword >>>>>", confirmPassword);
// Validation checks for username, password, and confirmation
    // Further API interaction for user registration
    if (userName.length >= 5) {
      if (password == confirmPassword) {
        console.log("password and confirmPassword match");
        if (password.length == 8) {
          console.log("call API");
          // await sendPostRequest(userName, password);
        
          let apiResponse = await apiGetUserData({
            "username": userName,
            "password": confirmPassword
          },"register");
          const parsedResult = JSON.parse(apiResponse);
          // apiResponse = "User Registered Successfully";

          if (
            parsedResult != null &&
            parsedResult.message == USER_REGISTERED
          ) {
            console.log("inside ");
            
            Keyboard.dismiss();
            Toast.show(parsedResult.message, {
              duration: Toast.durations.LONG,
            });
            navigation.navigate("Login");
          } else if (
            parsedResult != null &&
            parsedResult.message == USERNAME_EXISTS
          ) {
            Keyboard.dismiss();
            Toast.show(parsedResult.message, {
              duration: Toast.durations.LONG,
            });
          }
        } else {
          Keyboard.dismiss();
          console.log("password must be 8 characters");
          Toast.show("password must be 8 characters", {
            duration: Toast.durations.LONG,
          });
        }
      } else {
        Keyboard.dismiss();
        console.log("password and confirmPassword does not match");
        Toast.show("password and confirmPassword does not match", {
          duration: Toast.durations.LONG,
        });
      }
    } else {
      Keyboard.dismiss();
      console.log("userName should have 5 to 30 characters");
      Toast.show("userName should have 5 to 30 characters", {
        duration: Toast.durations.LONG,
      });
    }
  };
  // Function to dismiss the keyboard
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  }
  const handleOnPress = () => {
    // need to call a api or stroe the data for cache
  };

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    // keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
  >
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.innerContainer}>
      <TextEdit
        placeholder="UserName"
        onPressIn={handleOnPress}
        editable={true}
        keyboardType="default"
        maxTextLength={30}
        onChangeText={(v: any) => {
          setUserName(v);
        }}
        value={userName}
      />
      <TextEdit
        placeholder="CreatePassword"
        onPressIn={handleOnPress}
        editable={true}
        keyboardType="default"
        maxTextLength={8}
        onChangeText={(v: any) => {
          setPassword(v);
        }}
        value={password}
      />
      <TextEdit
        placeholder="ConfrimPassword"
        onPressIn={handleOnPress}
        editable={true}
        keyboardType="default"
        maxTextLength={8}
        onChangeText={(v: any) => {
          setConfirmPassword(v);
        }}
        value={confirmPassword}
      />
        <View style={styles.buttonContainer}>
          <CustomButton title="Register" onPress={handleRegisterButton} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </KeyboardAvoidingView>
);
};

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},
innerContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
},
input: {
  width: '100%',
  height: 40,
  marginBottom: 20,
  borderWidth: 1,
  borderColor: '#ccc',
  padding: 10,
},
buttonContainer: {
  marginTop: 20,
},
});
   