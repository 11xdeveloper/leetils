import { describe, expect, it } from "bun:test";
import { findMinimumInRotatedSortedArray } from ".";

describe("153. Find Minimum in Rotated Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(findMinimumInRotatedSortedArray([3, 4, 5, 1, 2])).toBe(1);
		expect(findMinimumInRotatedSortedArray([4, 5, 6, 7, 0, 1, 2])).toBe(0);
		expect(findMinimumInRotatedSortedArray([11, 13, 15, 17])).toBe(11);
	});

	it("finds the minimum for every rotation and length", () => {
		for (let length = 1; length <= 20; length++) {
			const sorted = Array.from({ length }, (_, i) => i * 3 - 20);
			for (let rotation = 0; rotation < length; rotation++) {
				const nums = [...sorted.slice(rotation), ...sorted.slice(0, rotation)];
				expect(findMinimumInRotatedSortedArray(nums)).toBe(-20);
			}
		}
	});
});
