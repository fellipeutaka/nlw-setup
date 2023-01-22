import { ActivityIndicator, ActivityIndicatorProps } from "react-native";

import colors from "tailwindcss/colors";

export function Spinner(props: ActivityIndicatorProps) {
  return (
    <ActivityIndicator size="large" color={colors.violet[500]} {...props} />
  );
}
