import React, { ReactElement, useState } from "react";
import styled from "styled-components";
import { RxHamburgerMenu } from "react-icons/rx";
import { Colors } from "ui";
import { useWindowDimensions } from "utilities";
import { InitialStateControls } from "./InitialStateControls";
import { SimulationParameterControls } from "./SimulationParameterControls";
import { IconButton } from "../../ui/IconButton";
import { IoMdClose } from "react-icons/io";

export function Controls(): ReactElement {
  const { height: windowHeight } = useWindowDimensions();
  const [open, setOpen] = useState(true);

  if (!open) {
    return (
      <IconButton
        onClick={(): void => setOpen(true)}
        style={{ position: "absolute", top: 16, right: 16 }}
      >
        <RxHamburgerMenu />
      </IconButton>
    );
  }

  return (
    // TODO: Why does 88 work - shouldn't 32 be enough?
    <ControlsContainer style={{ maxHeight: windowHeight - 88 }}>
      <IconButton
        onClick={(): void => setOpen(false)}
        style={{ position: "absolute", top: 0, right: 0 }}
      >
        <IoMdClose />
      </IconButton>
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
  overflow-x: auto;
  scroll-behaviour: smooth;
  padding: 12px;
  padding-bottom: 40px;
  padding-top: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
`;
