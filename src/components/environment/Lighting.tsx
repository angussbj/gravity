import React, { FC } from "react";

export const Lighting: FC = () => {
  // general glow plus three slightly different-warmth lights around the equator
  return (
    <>
      <ambientLight intensity={1} />
    </>
  );
};
