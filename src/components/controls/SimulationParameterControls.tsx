import React, { ReactElement } from "react";
import { Colors, NumberInput, Row } from "ui";
import { useUniverse } from "logic";
import styled from "styled-components";

export function SimulationParameterControls(): ReactElement {
  const universe = useUniverse();

  return (
    <Container style={{ color: Colors.LIGHT.toString(), fontSize: 12 }}>
      Path extrapolation parameters:
      <ControlsGroup>
        <NumberInput
          label={"Step count"}
          value={universe.pathingDepth}
          onSubmitOrBlur={(val): void => {
            universe.pathingDepth = val;
            universe.update();
          }}
        />
        <NumberInput
          label={"Step size"}
          value={universe.pathingStepSize}
          onSubmitOrBlur={(val): void => {
            universe.pathingStepSize = val;
            universe.update();
          }}
        />
      </ControlsGroup>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ControlsGroup = styled(Row)`
  gap: 4px;
  margin-left: 8px;
`;
