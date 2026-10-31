import { describe, expect, it } from "bun:test";
import { findSubarraysWithEqualSum as findSubarrays } from ".";

describe("2395. Find Subarrays With Equal Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(findSubarrays([4, 2, 4])).toBeTrue();
		expect(findSubarrays([1, 2, 3, 4, 5])).toBeFalse();
		expect(findSubarrays([0, 0, 0])).toBeTrue();
	});
});
