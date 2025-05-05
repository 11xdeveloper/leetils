export const myAtoi = (s: string): number =>
	((x: number) => (Number.isNaN(x) ? 0 : x))(Number.parseInt(s.trim()));
