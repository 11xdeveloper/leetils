import { describe, expect, it } from "bun:test";
import { maximumAscendingSubarraySum as maxAscendingSum } from ".";

describe("1800. Maximum Ascending Subarray Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxAscendingSum([10, 20, 30, 5, 10, 50])).toBe(65);
		expect(maxAscendingSum([10, 20, 30, 40, 50])).toBe(150);
		expect(maxAscendingSum([12, 17, 15, 13, 10, 11, 12])).toBe(33);
	});
});
