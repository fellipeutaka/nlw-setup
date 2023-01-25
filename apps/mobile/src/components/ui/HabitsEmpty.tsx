import { Text } from "react-native";

import { useAppNavigation } from "@mobile/hooks/useAppNavigation";

type HabitsEmptyProps = {
  isDateInPast: boolean;
};

export function HabitsEmpty({ isDateInPast }: HabitsEmptyProps) {
  const { navigate } = useAppNavigation();

  if (isDateInPast) {
    return (
      <Text className="text-zinc-400 text-base">
        There are no habits being tracked on that day
      </Text>
    );
  }

  return (
    <Text className="text-zinc-400 text-base">
      You are not tracking any habits yet,{" "}
      <Text
        className="text-violet-400 text-base underline active:text-violet-500"
        onPress={() => navigate("new")}
      >
        start registering one.
      </Text>
    </Text>
  );
}
