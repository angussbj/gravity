import React, { useEffect, useRef } from "react";
import "./TextField.css";
import { Colors } from "./colors";

interface Props {
  value: string | number;
  onChange: (newVal: string) => void;
  style?: React.CSSProperties;
  focusFirstRender?: boolean;
  onSubmit?: () => void;
  onBlur?: () => void;
  ariaLabel?: string;
}

export function TextField({
  value,
  onChange,
  style,
  focusFirstRender,
  onSubmit,
  onBlur,
  ariaLabel,
}: Props): React.ReactElement {
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (focusFirstRender) inputRef.current?.focus();
  }, []);

  return (
    <input
      ref={inputRef}
      value={value}
      className="input"
      onChange={(e): void => {
        onChange(e.target.value);
      }}
      onBlur={onBlur}
      onKeyDown={(e): void => {
        if (e.key === "Enter") onSubmit?.();
      }}
      aria-label={ariaLabel}
      style={{
        flex: 1,
        backgroundColor: Colors.DARK.toString(),
        borderColor: Colors.LIGHT_GREY.toString(),
        color: Colors.LIGHT.toString(),
        ...style,
      }}
    />
  );
}
