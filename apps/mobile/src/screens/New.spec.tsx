import { NavigationContainer } from "@react-navigation/native";
import { render, fireEvent } from "@testing-library/react-native";

import { weekDays } from "@mobile/constants/weekDays";

import { New } from "./New";

const elements = {
  titleInput: "Exercise, sleep well, etc...",
  titleErrorSpan: {
    required: "Please, type your commitment",
  },
  weekDays,
  weekDaysErrorSpan: {
    required: "Please, select one day of week at least",
  },
  submitButton: "Confirm",
};

jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("<New />", () => {
  it("should not be able to create a habit without title", async () => {
    const { getByText, findByText } = render(
      <NavigationContainer>
        <New />
      </NavigationContainer>
    );
    const sundayLabel = getByText(elements.weekDays[0]);
    fireEvent.press(sundayLabel);
    const submitButton = getByText(elements.submitButton);
    fireEvent.press(submitButton);
    const titleErrorSpan = await findByText(elements.titleErrorSpan.required);
    expect(titleErrorSpan).toBeVisible();
  });

  it("should not be able to create a habit without week days", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NavigationContainer>
        <New />
      </NavigationContainer>
    );
    const titleInput = getByPlaceholderText(elements.titleInput);
    fireEvent.changeText(titleInput, "Sleep 8 hours");
    const submitButton = getByText(elements.submitButton);
    fireEvent.press(submitButton);
    const weekDaysErrorSpan = await findByText(
      elements.weekDaysErrorSpan.required
    );
    expect(weekDaysErrorSpan).toBeVisible();
  });
});
