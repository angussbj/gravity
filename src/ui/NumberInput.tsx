import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { TextField } from "./TextField";
import { sanitiseNumericString } from "../utilities/sanitiseNumericString";
import { Column } from "./Column";
import styled from "styled-components";
import { Colors } from "./colors";
import { InputLabel } from "./InputLabel";

interface Props {
  label?: string;
  value: number;
  onSubmitOrBlur: (x: number) => void;
  style?: CSSProperties;
}

export function NumberInput({
  label,
  value,
  onSubmitOrBlur,
  style,
}: Props): ReactElement {
  const [x, setX] = useState(value.toString());

  useEffect(() => {
    if (x != value.toString()) setX(value.toString());
  }, [value]);

  const update = useCallback(() => {
    setX(x || "0");
    onSubmitOrBlur(parseFloat(x || "0"));
  }, [value, x, setX]);

  return (
    <Column style={style}>
      <InputLabel label={label} />
      <TextField
        value={x}
        onChange={(x): void => {
          setX(sanitiseNumericString(x));
        }}
        onSubmit={update}
        onBlur={update}
        style={{ width: style?.width ?? 62, maxWidth: style?.width ?? 62 }}
      />
    </Column>
  );
}

const LabelContainer = styled.div`
  color: ${Colors.LIGHT.toString()};
  font-size: 10px;
`;
