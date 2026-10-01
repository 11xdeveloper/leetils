import { describe, expect, it } from "bun:test";
import { numberOfWaysToPaintN3Grid as numOfWays } from ".";

/** Stacks explicit rows, checking every pair of neighbours. */
const byBruteForce = (n: number): number => {
	const rows: number[][] = [];
	for (let a = 0; a < 3; a++) {
		for (let b = 0; b < 3; b++)
			for (let c = 0; c < 3; c++) if (a !== b && b !== c) rows.push([a, b, c]);
	}
	let ways = rows.map(() => 1);
	for (let row = 1; row < n; row++) {
		ways = rows.map((below) =>
			rows.reduce(
				(sum, above, i) =>
					above.every((color, c) => color !== below[c])
						? sum + (ways[i] ?? 0)
						: sum,
				0,
			),
		);
	}
	return ways.reduce((sum, w) => sum + w, 0);
};

describe("1411. Number of Ways to Paint N × 3 Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfWays(1)).toBe(12);
		expect(numOfWays(5000)).toBe(30228214);
	});

	it("matches stacking explicit rows up to 10", () => {
		for (let n = 1; n <= 10; n++) expect(numOfWays(n)).toBe(byBruteForce(n));
	});
});
