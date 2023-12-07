import AsyncStorage from '@react-native-async-storage/async-storage';

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem("user", JSON.stringify(value));

    } catch (error) {
      console.log(error);
    }
  };
  
  // getting data
  const getUser = async () => {
    try {
      const userData = await AsyncStorage.getItem("user");
      console.log(userData);
      
      if (userData !== null) {
        return JSON.parse(userData); // Return parsed user data if it exists
      }
      return null; // Return null if user data doesn't exist
    } catch (error) {
      console.log(error);
      return null; // Return null in case of an error
    }
  };

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem("user");
      console.log("User data cleared successfully");
    } catch (error) {
      console.log(error);
    }
  };
  
  export { storeUser, getUser, clearUserData };