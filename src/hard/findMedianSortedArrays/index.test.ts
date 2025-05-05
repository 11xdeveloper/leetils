import { test, expect, describe } from "bun:test";
import { findMedianSortedArrays } from ".";

describe("Median of Two Sorted Arrays", () => {
	test(`Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).`, () => {
		expect(findMedianSortedArrays([1, 3], [2])).toBe(2);
		expect(findMedianSortedArrays([1, 2], [3, 4])).toBe(2.5);
	});
});
