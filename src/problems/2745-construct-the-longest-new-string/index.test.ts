import { describe, expect, it } from "bun:test";
import { constructTheLongestNewString as longestString } from ".";

/** Searches every sequence of pieces. */
const byBruteForce = (x: number, y: number, z: number): number => {
	let best = 0;
	const extend = (s: string, a: number, b: number, c: number): void => {
		best = Math.max(best, s.length);
		for (const [piece, left] of [
			["AA", a],
			["BB", b],
			["AB", c],
		] as const) {
			if (left === 0) continue;
			const next = s + piece;
			if (next.includes("AAA") || next.includes("BBB")) continue;
			extend(
				next,
				a - (piece === "AA" ? 1 : 0),
				b - (piece === "BB" ? 1 : 0),
				c - (piece === "AB" ? 1 : 0),
			);
		}
	};
	extend("", x, y, z);
	return best;
};

describe("2745. Construct the Longest New String", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestString(2, 5, 1)).toBe(12);
		expect(longestString(3, 2, 2)).toBe(14);
	});

	it("matches searching every sequence for small counts", () => {
		for (let x = 1; x <= 3; x++)
			for (let y = 1; y <= 3; y++)
				for (let z = 1; z <= 2; z++)
					expect(longestString(x, y, z)).toBe(byBruteForce(x, y, z));
	});
});
