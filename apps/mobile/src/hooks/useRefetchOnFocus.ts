import { useCallback } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

import { useFocusEffect } from "@react-navigation/native";
import { focusManager } from "@tanstack/react-query";

function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

export const useRefetchOnFocus = (refetch: () => void) => {
  useFocusEffect(
    useCallback(() => {
      refetch();
      const subscription = AppState.addEventListener(
        "change",
        onAppStateChange
      );
      return () => subscription.remove();
    }, [])
  );
};
