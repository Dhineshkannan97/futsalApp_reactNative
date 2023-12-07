import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import CustomButton from "./CustomButton";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};
// This React functional component, InvalidLoginPopup, represents a modal popup displayed when login credentials are invalid.
// It receives props like 'isVisible' (boolean) to determine whether the popup should be visible and 'onClose' (function) to handle closing the popup.
// The component utilizes the 'react-native-modal' library to create a modal.
// Inside the modal, it contains a View ('popup') with styling to define its appearance and size.
// It includes a Text component displaying the message 'Invalid Login Credentials' and a CustomButton to close the popup.
function InvalidLoginPopup({ isVisible, onClose }: Props) {
  
  return (
    <Modal isVisible={isVisible} style={styles.modal}>
      <View style={styles.popup}>
        <Text style={styles.text}>Invalid Login Credentials</Text>
        <View style={styles.buttonContainer}>
          <CustomButton title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
  popup: {
    height: 200,
    backgroundColor: "white", 
    width: 300, 
    padding: 30, 
    borderRadius: 10, 
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 60,
    fontFamily:"Inter-Bold"
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
});

export default InvalidLoginPopup;
