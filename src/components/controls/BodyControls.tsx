import { NumberInput, Row, VectorInput } from "ui";
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
    <BodyControlsContainer key={body.id}>
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
          <ColorSquare style={{ backgroundColor: body.color.toString() }} />
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
        onSubmitOrBlur={(val): void => {
          universe.setInitialMass(body.id, val);
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

const ColorSquare = styled.div`
  width: 12px;
  height: 12px;
  margin-top: 10px;
  margin-left: 12px;
`;
