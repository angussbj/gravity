import { Body, BodyParameters } from "./Body";
import { Vector3 } from "three";
import autoBind from "auto-bind";
import { Colors } from "ui";
import {
  bodyParametersToString,
  listToString,
  parseBodyParametersFromString,
  parseList,
  parseNullableFloat,
} from "./serialisation";
import { examples } from "./examples";

const G = 1;

export class Universe {
  private state0: BodyParameters[] = [];
  public state: Body[] = []; // TODO: should this be private? or called bodies?
  private t = 0;

  public pathingDepth = 5000;
  public pathingStepSize = 0.001;

  private bodyIdCounter = 0;

  constructor(public render: () => void) {
    this.setFromUrl();
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
    this.updateUrl();
  }

  public removeBody(bodyId: string): void {
    this.state0 = this.state0.filter((b) => b.id !== bodyId);
    this.updateUrl();
  }

  public setInitial<K extends keyof BodyParameters>(
    field: K,
    bodyId: string,
    value: BodyParameters[K]
  ): void {
    const body = this.state0.find((b) => b.id === bodyId);
    if (body) body[field] = value;
    this.updateUrl();
  }

  public updateUrl(): void {
    const url = new URL(window.location.toString());
    url.searchParams.set(
      "bodies",
      listToString(this.state0, bodyParametersToString)
    );
    url.searchParams.set("pathingStepSize", this.pathingStepSize.toString());
    url.searchParams.set("pathingDepth", this.pathingDepth.toString());
    window.history.pushState({}, "", url);
  }

  public setInitialStateFromString(input: string | null): void {
    this.state0 = parseList(input, parseBodyParametersFromString);
    this.bodyIdCounter = this.state0.length;
  }

  private setFromUrl(): void {
    const params = new URLSearchParams(window.location.search);
    this.setInitialStateFromString(params.get("bodies"));
    if (this.state0.length === 0)
      this.setInitialStateFromString(examples[0].stateString);
    this.pathingStepSize = parseNullableFloat(
      params.get("pathingStepSize"),
      0.001
    );
    this.pathingDepth = parseNullableFloat(params.get("pathingDepth"), 5000);
  }

  public update(): void {
    this.setToInitialState(); // This shouldn't be in the final update method
    this.calculatePaths();
    this.updateUrl();
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
    // TODO: turn this into a class so we can re-use variables without one giant function
    // TODO: adaptive step size
    const ZERO = new Vector3(0, 0, 0);
    const bodies = this.state.map((b) => ({
      x: b.x.clone(),
      v: b.v.clone(),
      m: b.m,
      dx: new Vector3(0, 0, 0),
      dv: new Vector3(0, 0, 0),
    }));
    let k: number;
    let r: number;
    const V = new Vector3(0, 0, 0);
    const O = new Vector3(0, 0, 0);
    let mTotal: number;
    let maxDx: number;
    let timeStep = this.pathingStepSize;

    for (let step = 0; step < this.pathingDepth; step++) {
      for (let i = 0; i < bodies.length; i++) {
        bodies[i].dx.copy(ZERO);
        bodies[i].dv.copy(ZERO);
      }

      // Build dv for each body from all the forces between pairs of bodies
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          V.copy(bodies[j].x).sub(bodies[i].x); // vector from bi to bj
          r = V.length();
          if (r == 0) continue; // TODO: better collision handling

          k = (timeStep * G) / (r * r);
          V.normalize().multiplyScalar(k * bodies[j].m); // dvi
          bodies[i].dv.add(V);
          V.normalize().multiplyScalar(-k * bodies[i].m); // dvj
          bodies[j].dv.add(V);
        }
      }

      O.setLength(0); // This will become center of mass of followed bodies
      mTotal = 0;
      maxDx = 0; // To check our step isn't too big
      for (let i = 0; i < bodies.length; i++) {
        V.copy(bodies[i].v).multiplyScalar(timeStep); // dxi
        bodies[i].dx.add(V);

        maxDx = Math.max(bodies[i].dx.length(), maxDx);

        if (this.state[i].frameFollows) {
          O.add(bodies[i].x.clone().multiplyScalar(bodies[i].m));
          mTotal += bodies[i].m;
        }
      }
      if (mTotal !== 0) O.divideScalar(mTotal);

      // either adjust the timestep or record the changes
      if (
        maxDx > this.pathingStepSize * 2 ||
        maxDx < this.pathingStepSize / 2
      ) {
        timeStep *= this.pathingStepSize / maxDx;
      } else {
        for (let i = 0; i < bodies.length; i++) {
          bodies[i].v.add(bodies[i].dv);
          bodies[i].x.add(bodies[i].dx);
          this.state[i].path.push(bodies[i].x.clone().sub(O));
        }
      }
    }
  }
}
