import React, { ReactElement } from "react";
import { Colors } from "ui";
import { useUniverse } from "logic";
import styled from "styled-components";
import { BodyControls } from "./BodyControls";
import { AddBodyButton } from "./AddBodyButton";

export function InitialStateControls(): ReactElement {
  const universe = useUniverse();

  return (
    <Container style={{ color: Colors.LIGHT.toString(), fontSize: 12 }}>
      Initial state:
      {universe.state.map((body, i) => {
        return (
          <>
            <BodyControls body={body} index={i} />
            <Separator />
          </>
        );
      })}
      <AddBodyButton />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const Separator = styled.div`
  border-bottom: 1px solid ${Colors.LIGHT.fade(0.5).toString()};
  align-self: stretch;
  margin-left: 40px;
  margin-right: 40px;
`;
