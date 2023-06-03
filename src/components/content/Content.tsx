import React, { ReactElement } from "react";
import { Line } from "./Line";
import { useUniverse } from "logic";

export function Content(): ReactElement {
  // const universe = useRef(new Universe()).current;
  const universe = useUniverse();

  return (
    <>
      {universe.state.map((body) => (
        <Line key={body.id} points={body.path} color={body.color} />
      ))}
    </>
  );
}
