import { describe, expect, it } from "bun:test";
import { adjacentIncreasingSubarraysDetectionI as hasIncreasingSubarrays } from ".";

describe("3349. Adjacent Increasing Subarrays Detection I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			hasIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1], 3),
		).toBeTrue();
		expect(
			hasIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7], 5),
		).toBeFalse();
	});
});
