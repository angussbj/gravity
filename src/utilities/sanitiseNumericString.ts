export function sanitiseNumericString(s: string): string {
  if (!s) return s;
  const negative = s[0] === "-";
  const pieces = s.replace(/[^0-9.]/g, "").split(".");
  return (
    (negative ? "-" : "") +
    (pieces.length >= 2
      ? pieces[0] + "." + pieces.slice(1).join("")
      : pieces[0])
  );
}
