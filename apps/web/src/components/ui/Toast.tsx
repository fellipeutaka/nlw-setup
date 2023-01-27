import { forwardRef, useImperativeHandle, useState } from "react";

import * as ToastPrimitive from "@radix-ui/react-toast";
import clsx from "clsx";
import { Check, X } from "phosphor-react";

import { capitalizeFirstLetter } from "@web/utils/capitalizeFirstLetter";

import { RenderIf } from "../utils/RenderIf";

export function ToastProvider({
  children,
  ...props
}: ToastPrimitive.ToastProviderProps) {
  return (
    <ToastPrimitive.Provider duration={3000} {...props}>
      {children}
      <ToastPrimitive.Viewport className="fixed top-6 right-6 flex flex-col gap-3 z-50" />
    </ToastPrimitive.Provider>
  );
}

export type ToastHandles = {
  show: () => void;
};

export type ToastStatus = "success" | "error";

export type ToastProps = ToastPrimitive.ToastProps & {
  message: string;
  status: ToastStatus;
};

export const Toast = forwardRef<ToastHandles, ToastProps>(
  ({ status, ...props }, ref) => {
    const [isVisible, setIsVisible] = useState(false);

    useImperativeHandle(ref, () => ({
      show: () => setIsVisible(true),
    }));

    return (
      <ToastPrimitive.Root
        {...props}
        open={isVisible}
        onOpenChange={setIsVisible}
        className={clsx(
          "bg-zinc-900 relative rounded-md py-4 pl-4 pr-16 max-w-sm gap-4 flex items-center",
          "border-l-8",
          { "border-l-green-500": status === "success" },
          { "border-l-red-500": status === "error" },
          "data-[state=open]:animate-slideIn data-[state=closed]:animate-hide",
          "data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]",
          "data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-transform",
          "data-[swipe=end]:animate-swipeOut"
        )}
      >
        <RenderIf condition={status === "success"}>
          <Check
            className="bg-green-500 rounded-full p-0.5"
            size={24}
            weight="bold"
          />
        </RenderIf>
        <RenderIf condition={status === "error"}>
          <X
            className="bg-red-500 rounded-full p-0.5"
            size={24}
            weight="bold"
          />
        </RenderIf>
        <div className="flex-1">
          <ToastPrimitive.Title className="font-bold">
            {capitalizeFirstLetter(status)}
          </ToastPrimitive.Title>
          <ToastPrimitive.Description className="text-zinc-200 text-sm">
            {props.message}
          </ToastPrimitive.Description>
        </div>
        <ToastPrimitive.Close
          className="absolute top-2 right-2 text-zinc-200"
          aria-label="Dismiss"
        >
          <X />
        </ToastPrimitive.Close>
      </ToastPrimitive.Root>
    );
  }
);
