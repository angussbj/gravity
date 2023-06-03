import React, { CSSProperties, ReactElement } from "react";
import { TextField } from "./TextField";
import { Column } from "./Column";
import { InputLabel } from "./InputLabel";

interface Props {
  label?: string;
  value: string;
  onChange: (x: string) => void;
  style?: CSSProperties;
}

export function TextInput({
  label,
  value,
  onChange,
  style,
}: Props): ReactElement {
  return (
    <Column style={style}>
      <InputLabel label={label} />
      <TextField
        value={value}
        onChange={onChange}
        style={{ width: style?.width ?? 62, maxWidth: style?.width ?? 62 }}
      />
    </Column>
  );
}
