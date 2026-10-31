import { describe, expect, it } from "bun:test";
import { applyOperationsOnArrayToMaximizeSumOfSquares as maxSum } from ".";

describe("2897. Apply Operations on Array to Maximize Sum of Squares", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([2, 6, 5, 8], 2)).toBe(261);
		expect(maxSum([4, 5, 4, 7], 3)).toBe(90);
	});

	it("reduces large squares modulo 1e9 + 7", () => {
		const big = 2 ** 30 + 1;
		expect(maxSum([big], 1)).toBe(
			Number((BigInt(big) * BigInt(big)) % 1_000_000_007n),
		);
	});
});
