import { describe, expect, it } from "bun:test";
import { removingMinimumAndMaximumFromArray as minimumDeletions } from ".";

describe("2091. Removing Minimum and Maximum From Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumDeletions([2, 10, 7, 5, 4, 1, 8, 6])).toBe(5);
		expect(minimumDeletions([0, -4, 19, 1, 8, -2, -3, 5])).toBe(3);
		expect(minimumDeletions([101])).toBe(1);
	});
});
