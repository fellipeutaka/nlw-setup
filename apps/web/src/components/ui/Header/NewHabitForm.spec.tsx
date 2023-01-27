import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { api } from "axios-config";
import MockAdapter from "axios-mock-adapter";

import { weekDays } from "@web/constants/weekDays";

import { NewHabitForm } from "./NewHabitForm";

// Mock for Radix UI Checkbox
global.ResizeObserver = class ResizeObserver {
  cb: any;
  constructor(cb: any) {
    this.cb = cb;
  }
  observe() {
    this.cb([{ borderBoxSize: { inlineSize: 0, blockSize: 0 } }]);
  }
  unobserve() {}
  disconnect() {}
};

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

const mock = new MockAdapter(api);

mock.onPost("/habits").reply(201);

jest.spyOn(window, "alert").mockImplementation(() => {});

describe("<NewHabitForm />", () => {
  it("should not be able to create a habit without title", async () => {
    const { getByText, findByText } = render(<NewHabitForm />);
    const sundayLabel = getByText(elements.weekDays[0]);
    await userEvent.click(sundayLabel);
    const submitButton = getByText(elements.submitButton);
    await userEvent.click(submitButton);
    const titleErrorSpan = await findByText(elements.titleErrorSpan.required);
    expect(titleErrorSpan).toBeVisible();
  });

  it("should not be able to create a habit without week days", async () => {
    const { getByPlaceholderText, getByText, findByText } = render(
      <NewHabitForm />
    );
    const titleInput = getByPlaceholderText(elements.titleInput);
    await userEvent.type(titleInput, "Sleep 8 hours");
    const submitButton = getByText(elements.submitButton);
    await userEvent.click(submitButton);
    const weekDaysErrorSpan = await findByText(
      elements.weekDaysErrorSpan.required
    );
    expect(weekDaysErrorSpan).toBeVisible();
  });

  it("should be able to create a habit", async () => {
    const { getByPlaceholderText, getByText } = render(<NewHabitForm />);
    const titleInput = getByPlaceholderText(elements.titleInput);
    await userEvent.type(titleInput, "Sleep 8 hours");
    const sundayLabel = getByText(elements.weekDays[0]);
    await userEvent.click(sundayLabel);
    const submitButton = getByText(elements.submitButton);
    await userEvent.click(submitButton);
    expect(window.alert).toHaveBeenCalledWith("Habit created successfully!");
  });
});
