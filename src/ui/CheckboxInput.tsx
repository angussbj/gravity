import React, { CSSProperties, ReactElement } from "react";
import "./Checkbox.css";
import { Column } from "./Column";
import { InputLabel } from "./InputLabel";
import { Colors } from "./colors";

interface Props {
  label?: string;
  value: boolean;
  onChange: (x: boolean) => void;
  style?: CSSProperties;
}

export function CheckboxInput({
  label,
  value,
  onChange,
  style,
}: Props): ReactElement {
  return (
    <Column style={style}>
      <InputLabel label={label} />
      <input
        type={"checkbox"}
        checked={value}
        onChange={(e): void => onChange(e.target.checked)}
        style={
          {
            backgroundColor: Colors.DARK.toString(),
            color: "red",
            accentColor: "green",
          } as CSSProperties // To make the type accept accent color key
        }
      />
    </Column>
  );
}
