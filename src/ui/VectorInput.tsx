import React, {
  CSSProperties,
  ReactElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Row } from "./Row";
import { Vector3 } from "three";
import { TextField } from "./TextField";
import { sanitiseNumericString } from "../utilities/sanitiseNumericString";
import { Column } from "./Column";
import { InputLabel } from "./InputLabel";

interface Props {
  label?: string;
  value: Vector3;
  onSubmitOrBlur: (x: Vector3) => void;
  style?: CSSProperties;
}

// This component will mutate the Vector
export function VectorInput({
  label,
  value,
  onSubmitOrBlur,
  style,
}: Props): ReactElement {
  const [x, setX] = useState(value.x.toString());
  const [y, setY] = useState(value.y.toString());
  const [z, setZ] = useState(value.z.toString());

  useEffect(() => {
    if (x != value.x.toString()) setX(value.x.toString());
    if (y != value.y.toString()) setY(value.y.toString());
    if (z != value.z.toString()) setZ(value.z.toString());
  }, [value.x, value.y, value.z]);

  const update = useCallback(() => {
    setX(x || "0");
    setY(y || "0");
    setZ(z || "0");
    value.setX(parseFloat(x || "0"));
    value.setY(parseFloat(y || "0"));
    value.setZ(parseFloat(z || "0"));
    onSubmitOrBlur(value);
  }, [value, x, y, z, setX, setY, setZ]);

  return (
    <Column style={style}>
      <InputLabel label={label + " (x, y, z)"} />
      <Row>
        <TextField
          value={x}
          onChange={(x): void => {
            setX(sanitiseNumericString(x));
          }}
          onSubmit={update}
          onBlur={update}
          style={{ width: 62, maxWidth: 62 }}
        />
        <TextField
          value={y}
          onChange={(y): void => {
            setY(sanitiseNumericString(y));
          }}
          onSubmit={update}
          onBlur={update}
          style={{ marginLeft: 4, width: 62, maxWidth: 62 }}
        />
        <TextField
          value={z}
          onChange={(z): void => {
            setZ(sanitiseNumericString(z));
          }}
          onSubmit={update}
          onBlur={update}
          style={{ marginLeft: 4, width: 62, maxWidth: 62 }}
        />
      </Row>
    </Column>
  );
}
