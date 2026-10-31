import { describe, expect, it } from "bun:test";
import { maximumDifferenceBetweenIncreasingElements as maxDifference } from ".";

describe("2016. Maximum Difference Between Increasing Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxDifference([7, 1, 5, 4])).toBe(4);
		expect(maxDifference([9, 4, 3, 2])).toBe(-1);
		expect(maxDifference([1, 5, 2, 10])).toBe(9);
	});

	it("needs a strict increase", () => {
		expect(maxDifference([3, 3, 3])).toBe(-1);
	});
});
