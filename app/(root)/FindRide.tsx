import { Text, View } from "react-native";
import { useLocationStore } from "@/store/useLocationStore";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  return (
    <View>
      <Text>You are here - {userAddress}</Text>
      <Text>You go to - {destinationAddress}</Text>
    </View>
  );
};

export default FindRide;
