import { useNavigation as defaultUseNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";

import type { RootStackParamList } from "@mobile/@types/RootStackParamList";

export function useAppNavigation() {
  return defaultUseNavigation<NativeStackNavigationProp<RootStackParamList>>();
}
