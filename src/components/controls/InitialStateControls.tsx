import React, { ReactElement } from "react";
import { Colors, NumberInput, VectorInput } from "ui";
import { useUniverse } from "logic";
import styled from "styled-components";

export function InitialStateControls(): ReactElement {
  const universe = useUniverse();

  return (
    <Container style={{ color: Colors.LIGHT.toString(), fontSize: 12 }}>
      Initial state:
      {universe.state.map((body, i) => {
        return (
          <BodyControlsContainer key={body.id}>
            {body.name || `Body ${i + 1}`}
            <VectorInput
              label={"Position"}
              value={body.x}
              onSubmitOrBlur={universe.update}
            />
            <VectorInput
              label={"Velocity"}
              value={body.v}
              onSubmitOrBlur={universe.update}
            />
            <NumberInput
              label={"Mass"}
              value={body.m}
              onSubmitOrBlur={(val): void => {
                universe.setInitialMass(body.id, val);
                universe.update();
              }}
            />
          </BodyControlsContainer>
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BodyControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
`;
