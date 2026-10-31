import { describe, expect, it } from "bun:test";
import { largestPositiveIntegerThatExistsWithItsNegative as findMaxK } from ".";

describe("2441. Largest Positive Integer That Exists With Its Negative", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMaxK([-1, 2, -3, 3])).toBe(3);
		expect(findMaxK([-1, 10, 6, 7, -7, 1])).toBe(7);
		expect(findMaxK([-10, 8, 6, 7, -2, -3])).toBe(-1);
	});
});
