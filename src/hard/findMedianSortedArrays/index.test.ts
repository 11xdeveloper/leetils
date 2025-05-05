import { describe, expect, it } from "bun:test";
import { findMedianSortedArrays } from "./index";

describe("findMedianSortedArrays", () => {
	it("should find median for arrays of different lengths", () => {
		expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
		expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
	});

	it("should handle empty arrays", () => {
		expect(findMedianSortedArrays([], [1])).toBe(1);
		expect(findMedianSortedArrays([2], [])).toBe(2);
		expect(findMedianSortedArrays([], [2, 3])).toBe(2.5);
	});

	it("should handle arrays with same values", () => {
		expect(findMedianSortedArrays([1, 1, 1], [1, 1, 1])).toBe(1);
		expect(findMedianSortedArrays([2, 2], [2, 2])).toBe(2);
	});

	it("should handle arrays with negative numbers", () => {
		expect(findMedianSortedArrays([-1, 1], [0])).toBe(0);
		expect(findMedianSortedArrays([-2, -1], [3, 4])).toBe(1);
	});

	it("should handle large sorted arrays", () => {
		expect(findMedianSortedArrays([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(5.5);
		expect(findMedianSortedArrays([1, 3, 5, 7], [2, 4, 6, 8, 9])).toBe(5);
	});

	it("should handle arrays with large numbers", () => {
		expect(findMedianSortedArrays([1000000], [1000001])).toBe(1000000.5);
		expect(findMedianSortedArrays([999999, 1000000], [1000001, 1000002])).toBe(
			1000000.5,
		);
	});
});
