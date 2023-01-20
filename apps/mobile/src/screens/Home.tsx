import { Text, View } from "react-native";

import { StatusBar } from "expo-status-bar";

export function Home() {
  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Text className="text-white text-4xl font-bold">Hello World!</Text>
      <StatusBar style="auto" />
    </View>
  );
}
