import React from "react";
import { IconButton as MuiIconButton } from "@material-ui/core";
import { useHover } from "./useHover";
import Color from "color";
import { Colors } from "./colors";

interface Props {
  onClick: () => void;
  color?: Color;
  disabled?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
  "aria-label"?: string;
}

export function IconButton({
  color = Colors.LIGHT,
  disabled,
  style,
  children,
  ...rest
}: Props): React.ReactElement {
  const [ref, hovered] = useHover();
  const fade = disabled ? 0.4 : hovered ? 0.15 : 0;

  return (
    <MuiIconButton
      style={{
        color: color?.fade(fade).toString(),
        ...style,
      }}
      ref={ref}
      disabled={disabled}
      {...rest}
    >
      {children}
    </MuiIconButton>
  );
}
