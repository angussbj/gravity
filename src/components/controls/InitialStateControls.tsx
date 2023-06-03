import React, { ReactElement } from "react";
import styled from "styled-components";
import { Colors } from "ui";
import { useWindowDimensions } from "utilities";

export function Controls(): ReactElement {
  const { height: windowHeight } = useWindowDimensions();

  return (
    <ControlsContainer style={{ maxHeight: windowHeight - 32 }}>
      <InitialStateControls />
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
  border: 1px solid ${Colors.WHITE.toString()};
  overflow-y: scroll;
  scroll-behaviour: smooth;
`;
