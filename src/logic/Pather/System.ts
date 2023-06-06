import { BodyParameters } from "../Body";
import { Vector3 } from "three";

export class System {
  points: Point[];
  V = ZERO.clone();

  constructor(public length: number) {
    this.points = [];
    for (let i = 0; i < length; i++) {
      this.points.push([ZERO.clone(), ZERO.clone()]);
    }
  }

  setVelocityToZero(): void {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i][1].copy(ZERO);
    }
  }

  setFrom(bodies: BodyParameters[]): this {
    if (this.points.length < bodies.length)
      throw new Error(
        `This system has size ${this.points.length} so cannot hold ${bodies.length} points`
      );

    for (let i = 0; i < bodies.length; i++) {
      this.points[i][0].copy(bodies[i].x0);
      this.points[i][1].copy(bodies[i].v0);
    }
    return this;
  }

  copy(other: System): this {
    if (this.points.length < other.points.length)
      throw new Error(
        `This system has size ${this.points.length} so cannot hold ${other.points.length} points`
      );

    for (let i = 0; i < other.points.length; i++) {
      this.points[i][0].copy(other.points[i][0]);
      this.points[i][1].copy(other.points[i][1]);
    }
    return this;
  }

  add(other: System): this {
    if (this.points.length != other.points.length)
      throw new Error(
        `Systems of different size cannot be added. This size: ${this.points.length}. Other size: ${other.points.length}`
      );

    for (let i = 0; i < this.points.length; i++) {
      this.points[i][0].add(other.points[i][0]);
      this.points[i][1].add(other.points[i][1]);
    }
    return this;
  }

  addMultiple(other: System, scalar: number): this {
    if (this.points.length != other.points.length)
      throw new Error(
        `Systems of different size cannot be added. This size: ${this.points.length}. Other size: ${other.points.length}`
      );

    for (let i = 0; i < this.points.length; i++) {
      this.points[i][0].add(
        this.V.copy(other.points[i][0]).multiplyScalar(scalar)
      );
      this.points[i][1].add(
        this.V.copy(other.points[i][1]).multiplyScalar(scalar)
      );
    }
    return this;
  }

  times(scalar: number): this {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i][0].multiplyScalar(scalar);
      this.points[i][1].multiplyScalar(scalar);
    }
    return this;
  }

  maxVelocity(): number {
    if (this.points.length === 0) return 0;
    let result = this.points[0][1].length();
    for (let i = 0; i < this.points.length; i++) {
      result = Math.max(result, this.points[i][1].length());
    }
    return result;
  }
}

type Point = [Vector3, Vector3]; // position and velocity

const ZERO = new Vector3(0, 0, 0);
