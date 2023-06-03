import { ColorInput, NumberInput, Row, VectorInput } from "ui";
import { TextInput } from "../../ui/TextInput";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Body, useUniverse } from "logic";
import { RemoveBodyButton } from "./RemoveBodyButton";

interface Props {
  body: Body;
  index: number;
}

export function BodyControls({ body, index }: Props): ReactElement {
  const universe = useUniverse();

  return (
    <BodyControlsContainer>
      <Row style={{ justifyContent: "space-between" }}>
        <Row>
          <TextInput
            label={"Name"}
            value={body.name ?? `Body ${index + 1}`}
            onChange={(newName): void => {
              body.name = newName;
              universe.setInitialName(body.id, newName);
              universe.render();
            }}
          />
          <ColorInput
            label={"Color"}
            value={body.color}
            onChange={(newColor): void => {
              body.color = newColor;
              universe.setInitialColor(body.id, newColor);
              universe.render();
            }}
          />
        </Row>
        <RemoveBodyButton bodyId={body.id} />
      </Row>
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
        onSubmitOrBlur={(newMass): void => {
          universe.setInitialMass(body.id, newMass);
          universe.update();
        }}
      />
    </BodyControlsContainer>
  );
}

const BodyControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
`;
