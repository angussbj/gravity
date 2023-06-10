import { Vn } from "./Vn";
import { Vector3 } from "three";

// This function mutates the passed output system to avoid allocating extra memory
// The output is the time derivative of the input treated as a system of bodies influenced by each others' gravity
export function gravitationalAcceleration(
  positions: Vn,
  masses: number[],
  output: Vn,
  G: number
): void {
  if (positions.length != masses.length || positions.length != output.length)
    throw new Error(
      "positions, masses, and output must all be the same length"
    );

  const V = ZERO.clone();
  let r: number;
  let k: number;

  output.setToZero();
  // Newtonian gravity determines change in velocity: a_i = Σ (m_j (x_j - x_i) / |x_j - x_i|^3)
  for (let i = 0; i < positions.length; i++) {
    for (let j = i + 1; j < positions.length; j++) {
      V.copy(positions.points[j]).sub(positions.points[i]); // vector from bi to bj
      r = V.length();
      if (r == 0) continue; // TODO: better collision handling

      k = G / (r * r);
      V.normalize().multiplyScalar(k * masses[j]); // dvi
      output.points[i].add(V);
      V.normalize().multiplyScalar(-k * masses[i]); // dvj
      output.points[j].add(V);
    }
  }
}

const ZERO = new Vector3(0, 0, 0);
