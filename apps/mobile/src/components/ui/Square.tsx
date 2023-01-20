import { Rect, Svg, SvgProps } from "react-native-svg";

type SquareProps = SvgProps & {
  borderColor: string;
  bgColor: string;
};

export function Square({ borderColor, bgColor, ...props }: SquareProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 40 40" fill="none" {...props}>
      <Rect
        x={1.25}
        y={1.25}
        width={37.5}
        height={37.5}
        rx={8.75}
        fill={bgColor}
        stroke={borderColor}
        strokeWidth={2.5}
      />
    </Svg>
  );
}
