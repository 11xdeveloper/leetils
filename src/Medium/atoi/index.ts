export default (s: string) =>
  ((x: number) => (Number.isNaN(x) ? 0 : x))(Number.parseInt(s.trim()));
