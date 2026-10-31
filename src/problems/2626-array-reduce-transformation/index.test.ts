import { describe, expect, it } from "bun:test";
import { arrayReduceTransformation } from ".";

describe("2626. Array Reduce Transformation", () => {
	it("solves the examples from the problem statement", () => {
		expect(arrayReduceTransformation([1, 2, 3, 4], (a, x) => a + x, 0)).toBe(
			10,
		);
		expect(
			arrayReduceTransformation([1, 2, 3, 4], (a, x) => a + x * x, 100),
		).toBe(130);
		expect(arrayReduceTransformation([], () => 0, 25)).toBe(25);
	});
});
