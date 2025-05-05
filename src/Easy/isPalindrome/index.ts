export default (x: number) =>
	((s: string) => s.split("").reverse().join("") === s)(x.toString());
