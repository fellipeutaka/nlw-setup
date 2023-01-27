import { createContext, ReactNode, useRef, useState } from "react";

import {
  ToastProvider as Provider,
  Toast,
  ToastHandles,
  ToastStatus,
  ToastProps,
} from "@web/components/ui/Toast";

type ToastShowParams = {
  message: string;
  type: ToastStatus;
};

type ToastContextProps = {
  show: (params: ToastShowParams) => void;
};

export const ToastContext = createContext({} as ToastContextProps);

type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const toastRef = useRef<ToastHandles>(null);
  const [toastConfig, setToastConfig] = useState<ToastProps>({
    message: "",
    status: "success",
  });

  function show({ message, type }: ToastShowParams) {
    setToastConfig((state) => ({
      ...state,
      message,
      status: type,
    }));
    toastRef.current?.show();
  }

  return (
    <ToastContext.Provider value={{ show }}>
      <Provider>
        {children}
        <Toast ref={toastRef} {...toastConfig} />
      </Provider>
    </ToastContext.Provider>
  );
}
