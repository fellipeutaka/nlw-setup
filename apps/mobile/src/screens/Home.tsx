import { View } from "react-native";

import { CalendarGraph } from "@mobile/components/ui/CalendarGraph";
import { Header } from "@mobile/components/ui/Header";

export function Home() {
  return (
    <View className="flex-1 items-center bg-black px-8 py-28">
      <Header />
      <CalendarGraph />
    </View>
  );
}
