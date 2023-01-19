import { Plus } from "phosphor-react";

import { Button } from "../form/Button";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="flex justify-between items-center w-full max-w-3xl mx-auto">
      <Logo />
      <Button>
        <Plus size={20} weight="bold" />
        <span className="text-white">New habit</span>
      </Button>
    </header>
  );
}
