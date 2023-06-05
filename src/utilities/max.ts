export function max<Ks extends string, T extends { [K in Ks]: number }>(
  xs: T[],
  key: Ks
): number {
  if (xs.length === 0) return 0;
  let result = xs[0][key];
  for (let i = 1; i < xs.length; i++) {
    if (xs[i][key] > result) result = xs[i][key];
  }
  return result;
}
