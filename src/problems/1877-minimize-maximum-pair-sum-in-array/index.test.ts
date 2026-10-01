import { describe, expect, it } from "bun:test";
import { minimizeMaximumPairSumInArray as minPairSum } from ".";

describe("1877. Minimize Maximum Pair Sum in Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minPairSum([3, 5, 2, 3])).toBe(7);
		expect(minPairSum([3, 5, 4, 2, 4, 6])).toBe(8);
	});
});
