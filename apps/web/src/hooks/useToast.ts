import { useContext } from "react";

import { ToastContext } from "@web/contexts/ToastContext";

export function useToast() {
  return useContext(ToastContext);
}
