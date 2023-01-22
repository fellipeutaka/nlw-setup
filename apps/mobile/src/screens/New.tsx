import { useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { api } from "axios-config";
import { Check } from "phosphor-react-native";

import { Button } from "@mobile/components/form/Button";
import { Checkbox } from "@mobile/components/form/Checkbox";
import { TextField } from "@mobile/components/form/TextField";
import { BackButton } from "@mobile/components/ui/BackButton";
import { weekDays } from "@mobile/constants/weekDays";

export function New() {
  const [title, setTitle] = useState("");
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const { goBack } = useNavigation();

  function handleToggleWeekDay(weekDayIndex: string) {
    if (selectedWeekDays.includes(weekDayIndex)) {
      setSelectedWeekDays((prevState) =>
        prevState.filter((weekDay) => weekDay !== weekDayIndex)
      );
    } else {
      setSelectedWeekDays((prevState) => [...prevState, weekDayIndex]);
    }
  }

  async function handleCreateNewHabit() {
    try {
      if (!title.trim() || selectedWeekDays.length === 0) {
        return Alert.alert(
          "New habit",
          "Enter the name of the habit and choose the periodicity"
        );
      }
      await api.post("/habits", { title, weekDays });
      goBack();
      Alert.alert("New habit", "Habit created successfully!");
    } catch (error) {
      console.error(error);
      Alert.alert("Whops", "Unable to create new habit");
    }
  }

  return (
    <View className="flex-1 bg-black px-8 py-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 64 }}
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
          value={title}
          onChangeText={setTitle}
        />
        <Text className="font-semibold mt-4 mb-3 text-white text-base">
          What's the recurrence?
        </Text>
        {weekDays.map((weekDay) => (
          <Checkbox
            key={weekDay}
            title={weekDay}
            checked={selectedWeekDays.includes(weekDay)}
            onPress={() => handleToggleWeekDay(weekDay)}
          />
        ))}
        <Button
          className="bg-green-600 border-transparent h-16 mt-6"
          onPress={handleCreateNewHabit}
        >
          <Check size={20} color="white" weight="bold" />
          <Text className="font-semibold text-base text-white ml-3">
            Confirm
          </Text>
        </Button>
      </ScrollView>
    </View>
  );
}
