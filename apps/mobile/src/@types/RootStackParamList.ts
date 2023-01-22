import type { ParamListBase } from "@react-navigation/native";

export type RootStackParamList = {
  home: undefined;
  new: undefined;
  habit: {
    date: string;
  };
} & ParamListBase;
