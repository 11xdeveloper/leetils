import { describe, expect, it } from "bun:test";
import { minimumSumOfMountainTripletsI as minimumSum } from ".";

describe("2908. Minimum Sum of Mountain Triplets I", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSum([8, 6, 1, 5, 3])).toBe(9);
		expect(minimumSum([5, 4, 8, 7, 10, 2])).toBe(13);
		expect(minimumSum([6, 5, 4, 3, 4, 5])).toBe(-1);
	});
});
