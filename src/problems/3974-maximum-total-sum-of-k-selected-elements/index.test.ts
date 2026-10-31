import { describe, expect, it } from "bun:test";
import { maximumTotalSumOfKSelectedElements as maxSum } from ".";

describe("3974. Maximum Total Sum of K Selected Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([6, 1, 2, 9], 3, 2)).toBe(26);
		expect(maxSum([3, 7, 5, 2], 2, 4)).toBe(43);
		expect(maxSum([4, 4], 1, 1)).toBe(4);
	});
});
