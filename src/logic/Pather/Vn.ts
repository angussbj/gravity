import { BodyParameters } from "../Body";
import { Vector3 } from "three";

export class Vn {
  points: Vector3[];
  V = ZERO.clone();

  constructor(public length: number) {
    this.points = [];
    for (let i = 0; i < length; i++) {
      this.points.push(ZERO.clone());
    }
  }

  setToZero(): void {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].copy(ZERO);
    }
  }

  setFrom(bodies: BodyParameters[], key: "x0" | "v0"): this {
    if (this.points.length < bodies.length)
      throw new Error(
        `This system has size ${this.points.length} so cannot hold ${bodies.length} points`
      );

    for (let i = 0; i < bodies.length; i++) {
      this.points[i].copy(bodies[i][key]);
    }
    return this;
  }

  copy(other: Vn): this {
    if (this.points.length < other.points.length)
      throw new Error(
        `This system has size ${this.points.length} so cannot hold ${other.points.length} points`
      );

    for (let i = 0; i < other.points.length; i++) {
      this.points[i].copy(other.points[i]);
    }
    return this;
  }

  add(other: Vn): this {
    if (this.points.length != other.points.length)
      throw new Error(
        `Systems of different size cannot be added. This size: ${this.points.length}. Other size: ${other.points.length}`
      );

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].add(other.points[i]);
    }
    return this;
  }

  addMultiple(other: Vn, scalar: number): this {
    if (this.points.length != other.points.length)
      throw new Error(
        `Systems of different size cannot be added. This size: ${this.points.length}. Other size: ${other.points.length}`
      );

    for (let i = 0; i < this.points.length; i++) {
      this.points[i].add(this.V.copy(other.points[i]).multiplyScalar(scalar));
    }
    return this;
  }

  times(scalar: number): this {
    for (let i = 0; i < this.points.length; i++) {
      this.points[i].multiplyScalar(scalar);
    }
    return this;
  }

  maxLength(): number {
    if (this.points.length === 0) return 0;
    let result = this.points[0].length();
    for (let i = 0; i < this.points.length; i++) {
      result = Math.max(result, this.points[i].length());
    }
    return result;
  }
}

const ZERO = new Vector3(0, 0, 0);
