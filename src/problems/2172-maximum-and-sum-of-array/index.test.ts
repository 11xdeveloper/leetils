import { describe, expect, it } from "bun:test";
import { maximumAndSumOfArray as maximumAndSum } from ".";

describe("2172. Maximum AND Sum of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumAndSum([1, 2, 3, 4, 5, 6], 3)).toBe(9);
		expect(maximumAndSum([1, 3, 10, 4, 7, 1], 9)).toBe(24);
	});

	it("fills every slot twice when needed", () => {
		expect(maximumAndSum([1, 1], 1)).toBe(2);
		expect(maximumAndSum([15, 15, 15, 15, 15, 15], 3)).toBe(12);
	});
});
