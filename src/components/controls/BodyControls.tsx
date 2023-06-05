import { CheckboxInput, ColorInput, NumberInput, Row, VectorInput } from "ui";
import { TextInput } from "../../ui/TextInput";
import React, { ReactElement } from "react";
import styled from "styled-components";
import { Body, useUniverse } from "logic";
import { RemoveBodyButton } from "./RemoveBodyButton";
import { Tooltip } from "@material-ui/core";

interface Props {
  body: Body;
  index: number;
}

export function BodyControls({ body, index }: Props): ReactElement {
  const universe = useUniverse();

  return (
    <BodyControlsContainer>
      <Row style={{ justifyContent: "space-between" }}>
        <Row style={{ gap: 4 }}>
          <TextInput
            label={"Name"}
            value={body.name ?? `Body ${index + 1}`}
            onChange={(newName): void => {
              body.name = newName.replace(/[_*]/, "");
              universe.setInitial("name", body.id, newName);
              universe.render();
            }}
          />
          <ColorInput
            label={"Color"}
            value={body.color}
            onChange={(newColor): void => {
              body.color = newColor;
              universe.setInitial("color", body.id, newColor);
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
      <Row style={{ gap: 4 }}>
        <NumberInput
          label={"Mass"}
          value={body.m}
          onSubmitOrBlur={(newMass): void => {
            universe.setInitial("m", body.id, newMass);
            universe.update();
          }}
        />
        <Tooltip
          title={
            "The frame of reference follows the center of mass of selected bodies"
          }
          enterDelay={600}
          enterNextDelay={400}
        >
          <div>
            <CheckboxInput
              label={"Frame"}
              value={body.frameFollows}
              onChange={(val): void => {
                universe.setInitial("frameFollows", body.id, val);
                universe.update();
              }}
            />
          </div>
        </Tooltip>
      </Row>
    </BodyControlsContainer>
  );
}

const BodyControlsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-left: 8px;
`;
