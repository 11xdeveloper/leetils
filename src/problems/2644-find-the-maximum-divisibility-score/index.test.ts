import { describe, expect, it } from "bun:test";
import { findTheMaximumDivisibilityScore as maxDivScore } from ".";

describe("2644. Find the Maximum Divisibility Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDivScore([4, 7, 9, 3, 9], [5, 2, 3])).toBe(3);
		expect(maxDivScore([20, 14, 21, 10], [5, 7, 5])).toBe(5);
		expect(maxDivScore([12], [10, 16])).toBe(10);
	});
});
