import * as Progress from "@radix-ui/react-progress";

type ProgressBarProps = {
  progress: number;
};

export function ProgressBar({ progress }: ProgressBarProps) {
  return (
    <Progress.Root
      className="h-3 rounded-xl bg-zinc-700 w-full mt-4"
      value={progress}
    >
      <Progress.Indicator
        aria-label="Habit progress completed that day"
        className="h-3 rounded-xl bg-violet-600 transition-all"
        style={{
          width: `${progress}%`,
        }}
      />
    </Progress.Root>
  );
}
