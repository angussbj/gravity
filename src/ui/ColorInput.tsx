import React, {
  CSSProperties,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { Column } from "./Column";
import { InputLabel } from "./InputLabel";
import Color from "color";
import { HexColorPicker } from "react-colorful";
import styled from "styled-components";
import { IconButton } from "./IconButton";

interface Props {
  label?: string;
  value: Color;
  onChange: (x: Color) => void;
  style?: CSSProperties;
}

export function ColorInput({
  label,
  value,
  onChange,
  style,
}: Props): ReactElement {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const closeOnEscape = (e: KeyboardEvent): void => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    const closeOnOutsideClick = (e: MouseEvent): void => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    window.addEventListener("mousedown", closeOnOutsideClick);

    return (): void => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [ref, setOpen]);

  // TODO: add hidden text input for accessibility
  return (
    <Column style={style}>
      <InputLabel label={label} />
      <IconButton
        onClick={(): void => setOpen((o) => !o)}
        style={{ marginBottom: -8, marginTop: -4, marginLeft: -4 }}
      >
        <ColorSquare style={{ backgroundColor: value.toString() }} />
      </IconButton>

      <Anchor>
        {open && (
          <div
            ref={ref}
            style={{
              position: "absolute",
              left: -60,
              zIndex: 1,
            }}
          >
            <HexColorPicker
              color={value.hex()}
              onChange={(c): void => {
                if (!c.includes("NaN")) onChange(Color(c));
              }}
            />
          </div>
        )}
      </Anchor>
    </Column>
  );
}

const ColorSquare = styled.div`
  width: 12px;
  height: 12px;
`;

const Anchor = styled.div`
  width: 1px;
  height: 1px;
  overflow: visible;
  position: relative;
`;
