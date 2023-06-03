import { Vector3 } from "three";

export interface BodyParameters {
  id: string;
  name?: string;
  x0: Vector3;
  v0: Vector3;
  m: number;
}

export interface Body extends BodyParameters {
  x: Vector3;
  v: Vector3;
  path: Vector3[];
}
