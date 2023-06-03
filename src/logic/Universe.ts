import { Body, BodyParameters } from "./Body";
import { Vector3 } from "three";
import autoBind from "auto-bind";

const G = 1;

export class Universe {
  private state0: BodyParameters[] = [];
  public state: Body[] = []; // TODO: should this be private? or called bodies?
  private t = 0;

  public pathingDepth = 40000;
  public pathingStepSize = 0.001;

  private bodyIdCounter = 0;

  constructor(private render: () => void) {
    console.log("Constructing a universe");
    this.addBody({
      x0: new Vector3(0, 0, 0),
      v0: new Vector3(0, 0, -0.12),
      m: 100,
    });
    this.addBody({
      x0: new Vector3(2.05, 0, 0),
      v0: new Vector3(0, 1, 6),
      m: 1,
    });
    this.addBody({
      x0: new Vector3(1.95, 0, 0),
      v0: new Vector3(0, -1, 6),
      m: 1,
    });
    this.setToInitialState();
    this.calculatePaths();
    autoBind(this);
  }

  public addBody(parameters: Omit<BodyParameters, "id">): void {
    // TODO: This assumes t = 0
    this.state0.push({ ...parameters, id: `b${this.bodyIdCounter}` });
    this.bodyIdCounter += 1;
  }

  public setInitialMass(bodyId: string, mass: number): void {
    const body = this.state0.find((b) => (b.id = bodyId));
    if (body) body.m = mass;
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
      path: [body.x0],
    }));
  }

  private calculatePaths(): void {
    // TODO: better algorithms - do some maths about how the field evolves
    const bodies = this.state.map((b) => ({
      x: b.x.clone(),
      v: b.v.clone(),
      m: b.m,
    }));
    let k: number;
    let r: number;
    const V = new Vector3(0, 0, 0);
    for (let step = 0; step < this.pathingDepth; step++) {
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          V.copy(bodies[j].x).sub(bodies[i].x); // vector from bi to bj
          r = V.length(); // TODO: handle collisions at least enough to handle r = 0
          k = (this.pathingStepSize * G) / (r * r);
          V.normalize().multiplyScalar(k * bodies[j].m); // dvi
          bodies[i].v.add(V);
          V.normalize().multiplyScalar(-k * bodies[i].m); // dvj
          bodies[j].v.add(V);

          V.copy(bodies[i].v).multiplyScalar(this.pathingStepSize); // dxi
          bodies[i].x.add(V);
          V.copy(bodies[j].v).multiplyScalar(this.pathingStepSize); // dxj
          bodies[j].x.add(V);
        }
      }

      for (let i = 0; i < bodies.length; i++) {
        this.state[i].path.push(bodies[i].x.clone());
      }
    }
  }
}
