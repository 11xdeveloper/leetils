import { describe, expect, it } from "bun:test";
import { maximizeAlternatingSumUsingSwaps as maxAlternatingSum } from ".";

describe("3695. Maximize Alternating Sum Using Swaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxAlternatingSum(
				[1, 2, 3],
				[
					[0, 2],
					[1, 2],
				],
			),
		).toBe(4);
		expect(maxAlternatingSum([1, 2, 3], [[1, 2]])).toBe(2);
		expect(
			maxAlternatingSum([1, 1000000000, 1, 1000000000, 1, 1000000000], []),
		).toBe(-2999999997);
	});
});
