import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@mobile/@types/RootStackParamList";
import { Habit } from "@mobile/screens/Habit";
import { Home } from "@mobile/screens/Home";
import { New } from "@mobile/screens/New";

const { Navigator, Screen } = createNativeStackNavigator<RootStackParamList>();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="home" component={Home} />
      <Screen name="new" component={New} />
      <Screen name="habit" component={Habit} />
    </Navigator>
  );
}
