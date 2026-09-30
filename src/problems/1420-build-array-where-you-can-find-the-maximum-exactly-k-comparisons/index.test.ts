import { describe, expect, it } from "bun:test";
import { buildArrayWhereYouCanFindTheMaximumExactlyKComparisons as numOfArrays } from ".";

/** Enumerates every array, running the search-cost algorithm on each. */
const byBruteForce = (n: number, m: number, k: number): number => {
	let count = 0;
	for (let code = 0; code < m ** n; code++) {
		let [rest, max, cost] = [code, -1, 0];
		for (let i = 0; i < n; i++) {
			const value = (rest % m) + 1;
			rest = Math.floor(rest / m);
			if (value > max) {
				max = value;
				cost++;
			}
		}
		if (cost === k) count++;
	}
	return count;
};

describe("1420. Build Array Where You Can Find The Maximum Exactly K Comparisons", () => {
	it("solves the examples from the problem statement", () => {
		expect(numOfArrays(2, 3, 1)).toBe(6);
		expect(numOfArrays(5, 2, 3)).toBe(0);
		expect(numOfArrays(9, 1, 1)).toBe(1);
	});

	it("handles k = 0 and the largest inputs", () => {
		expect(numOfArrays(3, 3, 0)).toBe(0);
		const count = numOfArrays(50, 100, 25);
		expect(count).toBeGreaterThanOrEqual(0);
		expect(count).toBeLessThan(1_000_000_007);
	});

	it("matches enumerating every array for small sizes", () => {
		for (let n = 1; n <= 5; n++) {
			for (let m = 1; m <= 4; m++) {
				for (let k = 0; k <= n; k++)
					expect(numOfArrays(n, m, k)).toBe(byBruteForce(n, m, k));
			}
		}
	});
});
