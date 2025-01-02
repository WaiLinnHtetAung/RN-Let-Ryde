import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="FindRide" options={{ headerShown: false }} />
      <Stack.Screen name="ConfirmRide" options={{ headerShown: false }} />
      <Stack.Screen name="BookRide" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
