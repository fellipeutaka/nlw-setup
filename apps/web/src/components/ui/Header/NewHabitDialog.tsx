import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";

import { Button } from "@web/components/form/Button";

import { NewHabitForm } from "./NewHabitForm";

export function NewHabitDialog() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button
          className="focus-visible:ring-2 focus-visible:ring-violet-600 focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          id="createHabitBtn"
        >
          <Plus size={20} weight="bold" />
          <span className="text-white">New habit</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/60 fixed inset-0 animate-overlayShow" />
        <Dialog.Content className="bg-zinc-900 rounded-2xl w-full max-w-md flex flex-col items-center gap-6 p-10 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-contentShow">
          <Dialog.Title className="text-3xl font-extrabold self-start">
            Create habit
          </Dialog.Title>
          <NewHabitForm />
          <Dialog.Close
            className="h-6 w-6 grid place-items-center absolute top-6 right-6 text-zinc-400 outline-none hover:opacity-60 focus-visible:opacity-60 transition-opacity"
            aria-label="Close"
          >
            <X size={24} />
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
