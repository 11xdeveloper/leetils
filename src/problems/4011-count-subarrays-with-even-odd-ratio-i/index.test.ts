import { describe, expect, it } from "bun:test";
import { countSubarraysWithEvenOddRatioI as countRatioSubarrays } from ".";

describe("4011. Count Subarrays With Even Odd Ratio I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countRatioSubarrays([1, 2, 1, 2], 3, 2)).toBe(7);
		expect(countRatioSubarrays([2, 2, 1], 2, 1)).toBe(3);
		expect(countRatioSubarrays([2, 2, 2], 1, 1)).toBe(0);
	});
});
