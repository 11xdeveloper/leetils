import { describe, expect, it } from "bun:test";
import { findPositiveIntegerSolutionForAGivenEquation as findSolution } from ".";

/** Checks every pair. */
const byBruteForce = (
	f: (x: number, y: number) => number,
	z: number,
): number[][] => {
	const pairs: number[][] = [];
	for (let x = 1; x <= 1000; x++) {
		for (let y = 1; y <= 1000; y++) if (f(x, y) === z) pairs.push([x, y]);
	}
	return pairs;
};

describe("1237. Find Positive Integer Solution for a Given Equation", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSolution({ f: (x, y) => x + y }, 5)).toEqual([
			[1, 4],
			[2, 3],
			[3, 2],
			[4, 1],
		]);
		expect(findSolution({ f: (x, y) => x * y }, 5)).toEqual([
			[1, 5],
			[5, 1],
		]);
	});

	it("matches checking every pair for a variety of increasing functions", () => {
		const functions = [
			(x: number, y: number) => x + y,
			(x: number, y: number) => x * y,
			(x: number, y: number) => x * x + y,
			(x: number, y: number) => x + y * y,
			(x: number, y: number) => x * x + y * y,
			(x: number, y: number) => (x + y) * (x + y),
			(x: number, y: number) => x * x * x + y * y * y,
			(x: number, y: number) => x * x * y,
			(x: number, y: number) => x * y * y,
		];
		for (const f of functions) {
			for (const z of [1, 2, 5, 13, 50, 100]) {
				expect(findSolution({ f }, z)).toEqual(byBruteForce(f, z));
			}
		}
	});

	it("calls f at most about 2000 times", () => {
		let calls = 0;
		findSolution(
			{
				f: (x, y) => {
					calls++;
					return x + y;
				},
			},
			100,
		);
		expect(calls).toBeLessThanOrEqual(2000);
	});
});
