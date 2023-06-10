import { BodyParameters } from "../Body";
import { Vector3 } from "three";
import { Vn } from "./Vn";
import { gravitationalAcceleration } from "./gravitationalAcceleration";
import { transformPathsToCenterOfMassFrame } from "./transformPathsToCenterOfMassFrame";

export class Pather {
  // inputs
  x: Vn;
  v: Vn;
  m: number[];

  // outputs
  paths: Vector3[][];
  vMid: Vn;

  // intermediates
  a: Vn;
  O: Vector3;

  constructor(
    initialState: BodyParameters[],
    private maxXStep: number,
    private G: number
  ) {
    this.x = new Vn(initialState.length).setFrom(initialState, "x0");
    this.v = new Vn(initialState.length).setFrom(initialState, "v0");
    this.m = initialState.map((b) => b.m);
    this.paths = initialState.map((b) => [b.x0]);
    this.vMid = new Vn(initialState.length);
    this.a = new Vn(initialState.length);
    gravitationalAcceleration(this.x, this.m, this.a, this.G); // initialise a0
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
    return transformPathsToCenterOfMassFrame(this.paths, frameIndices, this.m);
  }

  // Implementation of Verlet integration https://en.wikipedia.org/wiki/Verlet_integration#Velocity_Verlet
  step(): void {
    const dt = this.maxXStep / this.v.maxLength();
    this.vMid.copy(this.v).addMultiple(this.a, 0.5 * dt);
    this.x.addMultiple(this.vMid, dt);
    gravitationalAcceleration(this.x, this.m, this.a, this.G); // update acceleration
    this.v.copy(this.vMid).addMultiple(this.a, 0.5 * dt);
  }

  appendStateToPaths(): void {
    for (let i = 0; i < this.paths.length; i++) {
      this.paths[i].push(this.x.points[i].clone());
    }
  }
}
