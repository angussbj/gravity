import { Vector3 } from "three";
import Color from "color";

export interface BodyParameters {
  id: string;
  name?: string;
  color: Color;
  x0: Vector3;
  v0: Vector3;
  m: number;
}

export interface Body extends BodyParameters {
  x: Vector3;
  v: Vector3;
  path: Vector3[];
}
