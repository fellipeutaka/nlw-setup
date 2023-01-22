import { ScrollView, Text, View } from "react-native";

import { Check } from "phosphor-react-native";

import { Button } from "@mobile/components/form/Button";
import { Checkbox } from "@mobile/components/form/Checkbox";
import { TextField } from "@mobile/components/form/TextField";
import { BackButton } from "@mobile/components/ui/BackButton";
import { weekDays } from "@mobile/constants/weekDays";

export function New() {
  return (
    <View className="flex-1 bg-black px-8 py-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <BackButton />
        <Text className="mt-6 text-white font-extrabold text-3xl">
          Create habit
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          What's your commitment?
        </Text>
        <TextField
          placeholder="Exercise, sleep well, etc..."
          className="mt-3"
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What's the recurrence?
        </Text>
        {weekDays.map((weekDay) => (
          <Checkbox key={weekDay} title={weekDay} />
        ))}
        <Button className="bg-green-600 border-transparent py-4 mt-6">
          <Check size={20} color="white" weight="bold" />
          <Text className="font-semibold text-base text-white ml-3">
            Confirm
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
}
