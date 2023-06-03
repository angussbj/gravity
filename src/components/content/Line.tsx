import { extend, ReactThreeFiber } from "@react-three/fiber";
import { BufferGeometry, Line as ThreeLine, Vector3 } from "three";
import Color from "color";
import React, { ReactElement, useRef } from "react";
import { Colors } from "ui";

extend({ Line_: ThreeLine });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      line_: ReactThreeFiber.Object3DNode<ThreeLine, typeof ThreeLine>;
    }
  }
}

interface Props {
  points: Vector3[];
  color?: Color;
}

export function Line({ points, color = Colors.random() }: Props): ReactElement {
  const geometry = useRef(new BufferGeometry()).current;
  geometry.setFromPoints(points);

  return (
    <line_ geometry={geometry}>
      <lineBasicMaterial
        attach="material"
        color={color.toString()}
        linewidth={10}
        linecap={"round"}
        linejoin={"round"}
      />
    </line_>
  );
}
