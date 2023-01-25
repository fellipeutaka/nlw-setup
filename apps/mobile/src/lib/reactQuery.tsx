import NetInfo from "@react-native-community/netinfo";
import {
  QueryClient,
  QueryClientProvider,
  onlineManager,
} from "@tanstack/react-query";
import { api } from "axios-config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey, signal }) => {
        const { data } = await api.get(String(queryKey[0]), { signal });
        return data;
      },
      staleTime: 5 * 1000, // 5 seconds
    },
  },
});

onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

type ReactQueryProviderProps = {
  children: React.ReactNode;
};

export function ReactQueryProvider({ children }: ReactQueryProviderProps) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
