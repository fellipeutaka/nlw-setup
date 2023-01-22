import { TouchableOpacity } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import colors from "tailwindcss/colors";

export function BackButton() {
  const { goBack } = useNavigation();

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={goBack}>
      <ArrowLeft size={32} color={colors.zinc[400]} />
    </TouchableOpacity>
  );
}
