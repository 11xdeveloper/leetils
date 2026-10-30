import { describe, expect, it } from "bun:test";
import { slidingSubarrayBeauty as getSubarrayBeauty } from ".";

describe("2653. Sliding Subarray Beauty", () => {
	it("solves the examples from the problem statement", () => {
		expect(getSubarrayBeauty([1, -1, -3, -2, 3], 3, 2)).toEqual([-1, -2, -2]);
		expect(getSubarrayBeauty([-1, -2, -3, -4, -5], 2, 2)).toEqual([
			-1, -2, -3, -4,
		]);
		expect(getSubarrayBeauty([-3, 1, 2, -3, 0, -3], 2, 1)).toEqual([
			-3, 0, -3, -3, -3,
		]);
	});
});
