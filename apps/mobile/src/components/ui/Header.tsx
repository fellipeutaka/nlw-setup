import { Text, View } from "react-native";

import { Plus } from "phosphor-react-native";
import { violet } from "tailwindcss/colors";

import Logo from "@mobile/assets/logo.svg";
import { useAppNavigation } from "@mobile/hooks/useAppNavigation";

import { Button } from "../form/Button";

export function Header() {
  const { navigate } = useAppNavigation();
  return (
    <View className="flex-row w-full justify-between items-center mb-6">
      <Logo />
      <Button onPress={() => navigate("new")}>
        <Plus color={violet[500]} size={20} weight="bold" />
        <Text className="text-white ml-3 font-semibold">New</Text>
      </Button>
    </View>
  );
}
