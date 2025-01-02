import { Image, Text, TouchableOpacity, View } from "react-native";
import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { icons } from "@/constants";
import { router } from "expo-router";
import Map from "@/components/Map";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";

const RideLayout = ({
  title,
  children,
  snapPoints,
}: {
  title: string;
  children: React.ReactNode;
  snapPoints?: string[];
}) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <GestureHandlerRootView>
      <View className="flex-1 bg-white">
        <View className="flex flex-col h-screen bg-blue-500">
          <View className="flex flex-row absolute z-10 top-10 items-center justify-start px-5">
            <TouchableOpacity
              onPress={() => router.push("/(root)/(tabs)/Home")}
            >
              <View className="w-10 h-10 bg-white rounded-full justify-center items-center">
                <Image
                  source={icons.backArrow}
                  resizeMode="contain"
                  className="w-6 h-6"
                />
              </View>
            </TouchableOpacity>
            <Text className="text-lg font-JakartaBold ml-5">
              {title || "Go Back"}
            </Text>
          </View>
          <Map />
        </View>

        <BottomSheet
          keyboardBehavior="extend"
          ref={bottomSheetRef}
          snapPoints={snapPoints || ["50%", "85%"]}
          index={0}
        >
          <BottomSheetView style={{ flex: 1, padding: 20 }}>
            {children}
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};

export default RideLayout;
