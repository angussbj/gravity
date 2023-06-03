import React, { ReactElement } from "react";
import styled from "styled-components";
import { Colors } from "ui";
import { useWindowDimensions } from "utilities";
import { InitialStateControls } from "./InitialStateControls";
import { SimulationParameterControls } from "./SimulationParameterControls";

export function Controls(): ReactElement {
  const { height: windowHeight } = useWindowDimensions();

  return (
    <ControlsContainer style={{ maxHeight: windowHeight - 32 }}>
      <InitialStateControls />
      <SimulationParameterControls />
    </ControlsContainer>
  );
}

const ControlsContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 240px;
  min-height: 100px;
  background-color: ${Colors.DARK.toString()};
  border: 1px solid ${Colors.LIGHT.toString()};
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behaviour: smooth;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
