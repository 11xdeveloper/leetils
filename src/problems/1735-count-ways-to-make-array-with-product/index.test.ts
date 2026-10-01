import { describe, expect, it } from "bun:test";
import { countWaysToMakeArrayWithProduct as waysToFillArray } from ".";

/** Counts arrays position by position over the divisors left to fill. */
const byBruteForce = (n: number, k: number): number => {
	let ways = new Map([[k, 1]]);
	for (let position = 0; position < n; position++) {
		const next = new Map<number, number>();
		for (const [rest, count] of ways) {
			for (let d = 1; d <= rest; d++)
				if (rest % d === 0)
					next.set(rest / d, (next.get(rest / d) ?? 0) + count);
		}
		ways = next;
	}
	return ways.get(1) ?? 0;
};

describe("1735. Count Ways to Make Array With Product", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			waysToFillArray([
				[2, 6],
				[5, 1],
				[73, 660],
			]),
		).toEqual([4, 1, 50734910]);
		expect(
			waysToFillArray([
				[1, 1],
				[2, 2],
				[3, 3],
				[4, 4],
				[5, 5],
			]),
		).toEqual([1, 2, 3, 10, 5]);
	});

	it("matches counting arrays directly for small inputs", () => {
		for (let n = 1; n <= 5; n++) {
			for (let k = 1; k <= 40; k++)
				expect(waysToFillArray([[n, k]])).toEqual([byBruteForce(n, k)]);
		}
	});

	it("handles the largest inputs", () => {
		expect(waysToFillArray([[10000, 8192]])[0]).toBeLessThan(1_000_000_007);
		expect(waysToFillArray([[10000, 9973]])).toEqual([10000]);
	});
});
