import { Vector3 } from "three";

export function transformPathsToCenterOfMassFrame(
  paths: Vector3[][],
  frameIndices: number[],
  masses: number[]
): Vector3[][] {
  if (frameIndices.length == 0) return paths;
  const result = paths.map(() => [] as Vector3[]);

  let totalMass = 0;
  for (const i of frameIndices) {
    totalMass += masses[i];
  }

  const O = ZERO.clone();
  for (let t = 0; t < paths[0].length; t++) {
    // Set O to the center of mass
    O.copy(ZERO);
    for (const i of frameIndices) {
      O.add(paths[i][t].clone().multiplyScalar(masses[i]));
    }
    O.divideScalar(totalMass);

    for (let i = 0; i < paths.length; i++) {
      result[i].push(paths[i][t].clone().sub(O));
    }
  }
  return result;
}

const ZERO = new Vector3(0, 0, 0);
