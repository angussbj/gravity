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
import { Pather } from "./Pather";
import { isPresent } from "ts-is-present";

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
      0.0003
    );
    this.pathingDepth = parseNullableFloat(params.get("pathingDepth"), 100000);
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
    new Pather(this.state0, this.pathingStepSize, G)
      .path(this.pathingDepth)
      .getPaths(
        this.state0
          .map((body, i) => (body.frameFollows ? i : undefined))
          .filter(isPresent)
      )
      .forEach((path, i) => {
        this.state[i].path = path;
      });
  }
}
