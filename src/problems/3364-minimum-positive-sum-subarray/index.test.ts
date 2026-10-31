import { describe, expect, it } from "bun:test";
import { minimumPositiveSumSubarray as minimumSumSubarray } from ".";

describe("3364. Minimum Positive Sum Subarray", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumSumSubarray([3, -2, 1, 4], 2, 3)).toBe(1);
		expect(minimumSumSubarray([-2, 2, -3, 1], 2, 3)).toBe(-1);
		expect(minimumSumSubarray([1, 2, 3, 4], 2, 4)).toBe(3);
	});
});
