import { Fragment } from "react";
import { View } from "react-native";

import { DAY_SIZE } from "./HabitDay";

type PlaceholderDaysProps = {
  amount: number;
};

export function PlaceholderDays({ amount }: PlaceholderDaysProps) {
  return (
    <Fragment>
      {Array.from({ length: amount }).map((_, i) => (
        <View
          key={i}
          className="bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 m-1"
          style={{ width: DAY_SIZE, height: DAY_SIZE }}
        />
      ))}
    </Fragment>
  );
}
