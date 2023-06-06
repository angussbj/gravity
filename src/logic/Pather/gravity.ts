import { System } from "./System";
import { Vector3 } from "three";

// This function mutates the passed output system to avoid allocating extra memory
// The output is the time derivative of the input treated as a system of bodies influenced by each others' gravity
export function gravity(
  input: System,
  masses: number[],
  output: System,
  G: number
): void {
  if (input.length != masses.length || input.length != output.length)
    throw new Error("input, masses, and output must all be the same length");

  const V = ZERO.clone();
  let r: number;
  let k: number;

  output.setVelocityToZero();
  // Newtonian gravity determines change in velocity: a_i = Σ (m_j (x_j - x_i) / |x_j - x_i|^3)
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      V.copy(input.points[j][0]).sub(input.points[i][0]); // vector from bi to bj
      r = V.length();
      if (r == 0) continue; // TODO: better collision handling

      k = G / (r * r);
      V.normalize().multiplyScalar(k * masses[j]); // dvi
      output.points[i][1].add(V);
      V.normalize().multiplyScalar(-k * masses[i]); // dvj
      output.points[j][1].add(V);
    }
  }

  // Change in position is velocity
  for (let i = 0; i < input.length; i++) {
    output.points[i][0].copy(input.points[i][1]);
  }
}

const ZERO = new Vector3(0, 0, 0);
