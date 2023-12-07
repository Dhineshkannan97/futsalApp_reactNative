import { View, Text } from "react-native";
import { RouteNavigationParam } from "../functions/types";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import { getUserStatus } from "../functions/api";

// DashboardScreen functional component that takes navigation as a prop
export default function DashboardScreen({ navigation }: RouteNavigationParam) {
  // State to store the activation status fetched from an API
  const [activationStatus, setActivationStatus] = useState(null);

  // useEffect to fetch data from an API when the component mounts
  useEffect(() => {
    // Function to handle API data retrieval
    const handleApi = async () => {
      try {
        // Fetching data from the API using fetchData function
        const userStatus = await getUserStatus(); 
        // Setting the fetched data (activation status) to the state
        setActivationStatus(userStatus);
      } catch (error) {
        // Handling error if API call fails
        console.error('Error fetching data:', error);
      }
    };

    // Calling the API handler function when the component mounts
    handleApi();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // useEffect to navigate to the 'Login' screen based on activationStatus changes
  useEffect(() => {
    // Navigating to 'Login' screen if activationStatus is false
    if (activationStatus === false) {
      console.log('inside of dash');
      navigation.navigate('Login');
    }
  }, [activationStatus, navigation]); // Dependency array watches changes in activationStatus and navigation

  // Returning UI elements using React Native components
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Text component displaying a welcome message */}
      <Text>Wellcome to Futsal Book your favorite playgroud</Text>
      {/* Icon component displaying a soccer ball icon */}
      <Icon name="soccer-ball-o" size={100} color="#000" />
    </View>
  );
}
