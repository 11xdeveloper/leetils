import { describe, expect, it } from "bun:test";
import { minimumSwapsToGroupAll1sTogetherII as minSwaps } from ".";

describe("2134. Minimum Swaps to Group All 1's Together II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSwaps([0, 1, 0, 1, 1, 0, 0])).toBe(1);
		expect(minSwaps([0, 1, 1, 1, 0, 0, 1, 1, 0])).toBe(2);
		expect(minSwaps([1, 1, 0, 0, 1])).toBe(0);
	});

	it("handles all zeros and all ones", () => {
		expect(minSwaps([0, 0])).toBe(0);
		expect(minSwaps([1, 1])).toBe(0);
	});
});
