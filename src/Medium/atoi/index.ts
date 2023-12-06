export default (s: string) =>
    ((x: number) => (isNaN(x) ? 0 : x))(parseInt(s.trim()));
