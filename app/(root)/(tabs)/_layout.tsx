import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, Platform, View } from "react-native";
import { icons } from "@/constants";

const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => (
  <View
    className={`flex w-12 h-12 flex-row justify-center items-center rounded-full ${focused ? "bg-general-300" : ""} `}
  >
    <View
      className={`rounded-full w-12 h-12 items-center justify-center ${focused ? "bg-general-400" : ""}`}
    >
      <Image
        source={source}
        tintColor="white"
        resizeMode="contain"
        className="w-7 h-7"
      />
    </View>
  </View>
);

const Layout = () => (
  <Tabs
    initialRouteName="Home"
    screenOptions={{
      tabBarActiveTintColor: "white",
      tabBarInactiveTintColor: "white",
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: "#333",
        borderRadius: 50,
        paddingBottom: Platform.OS === "ios" ? 0 : 30,
        overflow: "hidden",
        marginHorizontal: 20,
        marginBottom: 15,
        height: 78,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
      },
    }}
  >
    <Tabs.Screen
      name="Home"
      options={{
        title: "Home",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.home} />
        ),
      }}
    />
    <Tabs.Screen
      name="Rides"
      options={{
        title: "Rides",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.list} />
        ),
      }}
    />
    <Tabs.Screen
      name="Chat"
      options={{
        title: "Chat",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.chat} />
        ),
      }}
    />
    <Tabs.Screen
      name="Profile"
      options={{
        title: "Profile",
        headerShown: false,
        tabBarIcon: ({ focused }) => (
          <TabIcon focused={focused} source={icons.profile} />
        ),
      }}
    />
  </Tabs>
);

export default Layout;
