import React, { ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Lighting } from "./Lighting";
import { OrbitControls } from "@react-three/drei";
import { Colors } from "ui";

export function Environment({
  children,
}: {
  children: ReactNode;
}): React.ReactElement {
  return (
    <div style={{ position: "absolute", left: 0, right: 0, top: 0, bottom: 0 }}>
      <Canvas
        style={{ background: Colors.BLACK.toString() }}
        camera={{ position: [0, 5, 0] }}
        shadows
      >
        <gridHelper args={[20, 20]} />
        <Lighting />
        {children}
        <OrbitControls autoRotate={false} />
      </Canvas>
    </div>
  );
}
