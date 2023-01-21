import { Logo } from "./Logo";
import { NewHabitDialog } from "./NewHabitDialog";

export function Header() {
  return (
    <header className="flex justify-between items-center w-full max-w-3xl mx-auto">
      <Logo />
      <NewHabitDialog />
    </header>
  );
}
