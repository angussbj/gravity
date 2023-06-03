import React, { ReactElement } from "react";
import styled from "styled-components";
import { Colors } from "./colors";

interface Props {
  label?: string;
}

export function InputLabel({ label }: Props): ReactElement | null {
  return label ? <LabelContainer>{label}</LabelContainer> : null;
}

const LabelContainer = styled.div`
  color: ${Colors.LIGHT.toString()};
  font-size: 10px;
`;
