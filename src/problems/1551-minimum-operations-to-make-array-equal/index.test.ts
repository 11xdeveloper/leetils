import { describe, expect, it } from "bun:test";
import { minimumOperationsToMakeArrayEqual as minOperations } from ".";

describe("1551. Minimum Operations to Make Array Equal", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations(3)).toBe(2);
		expect(minOperations(6)).toBe(9);
	});

	it("matches adding up each element's shortfall below the mean", () => {
		for (let n = 1; n <= 10000; n += 37) {
			let total = 0;
			for (let i = 0; i < n; i++) total += Math.max(0, n - (2 * i + 1));
			expect(minOperations(n)).toBe(total);
		}
	});
});
