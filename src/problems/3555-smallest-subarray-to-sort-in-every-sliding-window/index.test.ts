import { describe, expect, it } from "bun:test";
import { smallestSubarrayToSortInEverySlidingWindow as minSubarraySort } from ".";

describe("3555. Smallest Subarray to Sort in Every Sliding Window", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSubarraySort([1, 3, 2, 4, 5], 3)).toEqual([2, 2, 0]);
		expect(minSubarraySort([5, 4, 3, 2, 1], 4)).toEqual([4, 4]);
	});
});
