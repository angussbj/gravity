import { Body, BodyParameters } from "./Body";
import { Vector3 } from "three";
import autoBind from "auto-bind";
import { Colors } from "ui";

const G = 1;

export class Universe {
  private state0: BodyParameters[] = [];
  public state: Body[] = []; // TODO: should this be private? or called bodies?
  private t = 0;

  public pathingDepth = 5000;
  public pathingStepSize = 0.001;

  private bodyIdCounter = 0;

  constructor(public render: () => void) {
    this.addBody({
      x0: new Vector3(0, 0, 0),
      v0: new Vector3(0, 0, -0.12),
      m: 100,
    });
    this.addBody({
      x0: new Vector3(2.03, 0, 0),
      v0: new Vector3(0, 3, 6),
      m: 1,
    });
    this.addBody({
      x0: new Vector3(1.97, 0, 0),
      v0: new Vector3(0, -3, 6),
      m: 1,
    });
    this.setToInitialState();
    this.calculatePaths();
    autoBind(this);
  }

  public addBody(parameters?: Omit<Partial<BodyParameters>, "id">): void {
    this.state0.push({
      x0: new Vector3(0, 0, 0),
      v0: new Vector3(0, 0, 0),
      m: 0,
      color: Colors.random(),
      frameFollows: false,
      ...parameters,
      id: `b${this.bodyIdCounter}`,
    });
    this.bodyIdCounter += 1;
  }

  public removeBody(bodyId: string): void {
    this.state0 = this.state0.filter((b) => b.id !== bodyId);
  }

  public setInitial<K extends keyof BodyParameters>(
    field: K,
    bodyId: string,
    value: BodyParameters[K]
  ): void {
    const body = this.state0.find((b) => b.id === bodyId);
    if (body) body[field] = value;
  }

  public update(): void {
    this.setToInitialState(); // This shouldn't be in the final update method
    this.calculatePaths();
    this.render();
  }

  private setToInitialState(): void {
    this.state = this.state0.map((body) => ({
      ...body,
      x: body.x0,
      v: body.v0,
      path: [],
    }));
  }

  private calculatePaths(): void {
    // TODO: better algorithms - do some maths about how the field evolves
    // TODO: adaptive step size
    const bodies = this.state.map((b) => ({
      x: b.x.clone(),
      v: b.v.clone(),
      m: b.m,
    }));
    let k: number;
    let r: number;
    const V = new Vector3(0, 0, 0);
    const O = new Vector3(0, 0, 0);
    let mTotal: number;
    for (let step = 0; step < this.pathingDepth; step++) {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          V.copy(bodies[j].x).sub(bodies[i].x); // vector from bi to bj
          r = V.length();
          if (r == 0) continue; // TODO: better collision handling

          k = (this.pathingStepSize * G) / (r * r);
          V.normalize().multiplyScalar(k * bodies[j].m); // dvi
          bodies[i].v.add(V);
          V.normalize().multiplyScalar(-k * bodies[i].m); // dvj
          bodies[j].v.add(V);
        }
      }

      // Find current center of mass of bodies that the frame follows
      O.setLength(0);
      mTotal = 0;
      for (let i = 0; i < bodies.length; i++) {
        V.copy(bodies[i].v).multiplyScalar(this.pathingStepSize); // dxi
        bodies[i].x.add(V);

        if (this.state[i].frameFollows) {
          O.add(bodies[i].x.clone().multiplyScalar(bodies[i].m));
          mTotal += bodies[i].m;
        }
      }
      if (mTotal !== 0) O.divideScalar(mTotal);

      for (let i = 0; i < bodies.length; i++) {
        this.state[i].path.push(bodies[i].x.clone().sub(O));
      }
    }
  }
}
