import { describe, expect, it } from "bun:test";
import { applyOperationsToMakeSumOfArrayGreaterThanOrEqualToK as minOperations } from ".";

describe("3091. Apply Operations to Make Sum of Array Greater Than or Equal to k", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations(11)).toBe(5);
		expect(minOperations(1)).toBe(0);
	});

	it("matches trying every value", () => {
		for (let k = 1; k <= 500; k++) {
			let best = Number.POSITIVE_INFINITY;
			for (let v = 1; v <= k; v++)
				best = Math.min(best, v - 1 + Math.ceil(k / v) - 1);
			expect(minOperations(k)).toBe(best);
		}
	});
});
