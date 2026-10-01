import { describe, expect, it } from "bun:test";
import { searchInRotatedSortedArray } from ".";

describe("33. Search in Rotated Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 0)).toBe(4);
		expect(searchInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2], 3)).toBe(-1);
		expect(searchInRotatedSortedArray([1], 0)).toBe(-1);
	});

	it("handles one and two elements", () => {
		expect(searchInRotatedSortedArray([1], 1)).toBe(0);
		expect(searchInRotatedSortedArray([3, 1], 1)).toBe(1);
		expect(searchInRotatedSortedArray([3, 1], 3)).toBe(0);
	});

	it("agrees with indexOf for every rotation, length and target", () => {
		for (let length = 1; length <= 12; length++) {
			const sorted = Array.from({ length }, (_, i) => i * 2);
			for (let rotation = 0; rotation < length; rotation++) {
				const nums = [...sorted.slice(rotation), ...sorted.slice(0, rotation)];
				for (let target = -1; target <= length * 2; target++) {
					expect(searchInRotatedSortedArray(nums, target)).toBe(
						nums.indexOf(target),
					);
				}
			}
		}
	});
});
