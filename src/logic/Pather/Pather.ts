import { BodyParameters } from "../Body";
import { Vector3 } from "three";
import { System } from "./System";
import { gravity } from "./gravity";
import { transformPathsToCenterOfMassFrame } from "./transformPathsToCenterOfMassFrame";

export class Pather {
  // inputs
  state: System;
  masses: number[];

  // outputs
  paths: Vector3[][];

  // intermediates
  k1: System;
  k2: System;
  k3: System;
  k4: System;
  s1: System;
  s2: System;
  s3: System;

  O: Vector3;

  constructor(
    initialState: BodyParameters[],
    private maxXStep: number,
    private G: number
  ) {
    this.state = new System(initialState.length).setFrom(initialState);
    this.masses = initialState.map((b) => b.m);
    this.paths = initialState.map((b) => [b.x0]);
    this.k1 = new System(initialState.length);
    this.k2 = new System(initialState.length);
    this.k3 = new System(initialState.length);
    this.k4 = new System(initialState.length);
    this.s1 = new System(initialState.length);
    this.s2 = new System(initialState.length);
    this.s3 = new System(initialState.length);
    this.O = new Vector3(0, 0, 0);
  }

  path(depth: number): this {
    for (let i = 0; i < depth; i++) {
      this.step();
      this.appendStateToPaths();
    }
    return this;
  }

  getPaths(frameIndices: number[]): Vector3[][] {
    return transformPathsToCenterOfMassFrame(
      this.paths,
      frameIndices,
      this.masses
    );
  }

  // TODO: Try Verlet integration
  // Implementation of RK4 https://en.wikipedia.org/wiki/Runge%E2%80%93Kutta_methods#The_Runge%E2%80%93Kutta_method
  step(): void {
    const timeStep = this.maxXStep / this.state.maxVelocity();
    gravity(this.state, this.masses, this.k1, this.G); // Calculate and set k1
    this.s1.copy(this.state).addMultiple(this.k1, 0.5 * timeStep);
    gravity(this.s1, this.masses, this.k2, this.G); // Calculate and set k2
    this.s2.copy(this.state).addMultiple(this.k2, 0.5 * timeStep);
    gravity(this.s2, this.masses, this.k3, this.G); // Calculate and set k3
    this.s3.copy(this.state).addMultiple(this.k3, timeStep);
    gravity(this.s3, this.masses, this.k4, this.G); // Calculate and set k4

    // s_{n+1} = s_n + (h/6)(k_1 + 2k_2 + 2k_3 + k_4)
    this.state.addMultiple(
      this.k1.addMultiple(this.k2, 2).addMultiple(this.k3, 2).add(this.k4),
      timeStep / 6
    );
  }

  appendStateToPaths(): void {
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].push(this.state.points[i][0].clone());
    }
  }
}
