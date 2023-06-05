import { BodyParameters } from "./Body";
import Color from "color";
import { Vector3 } from "three";

export function bodyParametersToString(body: BodyParameters): string {
  return [
    body.id,
    body.name ?? "",
    body.color.hex(),
    body.x0.x.toString(),
    body.x0.y.toString(),
    body.x0.z.toString(),
    body.v0.x.toString(),
    body.v0.y.toString(),
    body.v0.z.toString(),
    body.m.toString(),
    (+body.frameFollows).toString(),
  ].join("_");
}

export function parseBodyParametersFromString(input: string): BodyParameters {
  const parts = input.split("_");
  return {
    id: parts[0],
    name: parts[1],
    color: Color(parts[2]),
    x0: new Vector3(
      parseFloat(parts[3]),
      parseFloat(parts[4]),
      parseFloat(parts[5])
    ),
    v0: new Vector3(
      parseFloat(parts[6]),
      parseFloat(parts[7]),
      parseFloat(parts[8])
    ),
    m: parseFloat(parts[9]),
    frameFollows: Boolean(parseInt(parts[10])),
  };
}

export function listToString<T>(
  list: T[],
  elementToString: (x: T) => string
): string {
  return list.map(elementToString).join("*");
}

export function parseList<T>(
  input: string | null,
  elementParser: (x: string) => T
): T[] {
  return input?.split("*").map(elementParser) ?? [];
}

export function parseNullableFloat<T extends number | null>(
  input: string | null,
  defaultValue: T
): number | T {
  return input !== null ? parseFloat(input) : defaultValue;
}
