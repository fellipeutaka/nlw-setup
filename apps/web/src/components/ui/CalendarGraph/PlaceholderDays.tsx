import { Fragment } from "react";

type PlaceholderDaysProps = {
  amount: number;
};

export function PlaceholderDays({ amount }: PlaceholderDaysProps) {
  return (
    <Fragment>
      {Array.from({ length: amount }).map((_, i) => (
        <div
          key={i}
          className="w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
        />
      ))}
    </Fragment>
  );
}
