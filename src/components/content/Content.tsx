import React, { ReactElement } from "react";
import { Line } from "./Line";
import { useUniverse } from "logic";

export function Content(): ReactElement {
  // const universe = useRef(new Universe()).current;
  const universe = useUniverse();
  console.log("Content");

  return (
    <>
      {universe.state.map((body, i) => (
        // TODO: body ids
        <Line key={i} points={body.path} />
      ))}
    </>
  );
}
