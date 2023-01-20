import { useEffect, useState } from "react";

import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { StatusBar } from "expo-status-bar";

import { Home } from "@mobile/screens/Home";
import { Loading } from "@mobile/screens/Loading";
import { wait } from "@mobile/utils/wait";

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasFontLoaded] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (hasFontLoaded) {
      wait(2000).then(() => setIsLoading(false));
    }
  }, [hasFontLoaded]);

  if (isLoading) {
    return <Loading />;
  }

  return <Home />;
}
