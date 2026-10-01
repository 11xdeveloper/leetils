import { describe, expect, it } from "bun:test";
import { minimizeProductSumOfTwoArrays as minProductSum } from ".";

describe("1874. Minimize Product Sum of Two Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minProductSum([5, 3, 4, 2], [4, 2, 2, 5])).toBe(40);
		expect(minProductSum([2, 1, 4, 5, 7], [3, 2, 4, 8, 6])).toBe(65);
	});
});
