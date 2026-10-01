import { describe, expect, it } from "bun:test";
import { searchInsertPosition } from ".";

const byLinearSearch = (nums: number[], target: number): number => {
	const index = nums.findIndex((num) => num >= target);
	return index === -1 ? nums.length : index;
};

describe("35. Search Insert Position", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchInsertPosition([1, 3, 5, 6], 5)).toBe(2);
		expect(searchInsertPosition([1, 3, 5, 6], 2)).toBe(1);
		expect(searchInsertPosition([1, 3, 5, 6], 7)).toBe(4);
	});

	it("inserts before the first element", () => {
		expect(searchInsertPosition([1, 3, 5, 6], 0)).toBe(0);
		expect(searchInsertPosition([1], 0)).toBe(0);
	});

	it("agrees with a linear search for every length and target", () => {
		for (let length = 1; length <= 12; length++) {
			const nums = Array.from({ length }, (_, i) => i * 2 - 5);
			for (let target = -8; target <= length * 2; target++) {
				expect(searchInsertPosition(nums, target)).toBe(
					byLinearSearch(nums, target),
				);
			}
		}
	});
});
