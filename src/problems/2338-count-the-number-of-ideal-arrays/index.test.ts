import { describe, expect, it } from "bun:test";
import { countTheNumberOfIdealArrays as idealArrays } from ".";

/** Extends arrays one value at a time. */
const byBruteForce = (n: number, maxValue: number): number => {
	let ways = new Array<number>(maxValue + 1).fill(1);
	ways[0] = 0;
	for (let i = 1; i < n; i++) {
		const next = new Array<number>(maxValue + 1).fill(0);
		for (let v = 1; v <= maxValue; v++)
			for (let m = v; m <= maxValue; m += v)
				next[m] = (next[m] ?? 0) + (ways[v] ?? 0);
		ways = next;
	}
	return ways.reduce((sum, w) => sum + w, 0);
};

describe("2338. Count the Number of Ideal Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(idealArrays(2, 5)).toBe(10);
		expect(idealArrays(5, 3)).toBe(11);
	});

	it("matches extending arrays on small inputs", () => {
		for (let n = 1; n <= 6; n++)
			for (let maxValue = 1; maxValue <= 20; maxValue++)
				expect(idealArrays(n, maxValue)).toBe(byBruteForce(n, maxValue));
	});

	it("reduces large counts", () => {
		expect(idealArrays(5878, 2900)).toBe(465_040_898);
	});
});
