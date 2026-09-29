import { describe, expect, it } from "bun:test";
import { findFirstAndLastPositionOfElementInSortedArray as searchRange } from ".";

describe("34. Find First and Last Position of Element in Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(searchRange([5, 7, 7, 8, 8, 10], 8)).toEqual([3, 4]);
		expect(searchRange([5, 7, 7, 8, 8, 10], 6)).toEqual([-1, -1]);
		expect(searchRange([], 0)).toEqual([-1, -1]);
	});

	it("handles a single match and an array that is all the target", () => {
		expect(searchRange([1, 2, 3], 2)).toEqual([1, 1]);
		expect(searchRange([2, 2, 2, 2], 2)).toEqual([0, 3]);
	});

	it("handles targets beyond either end", () => {
		expect(searchRange([1, 2, 3], 0)).toEqual([-1, -1]);
		expect(searchRange([1, 2, 3], 4)).toEqual([-1, -1]);
	});

	it("agrees with indexOf and lastIndexOf on random sorted arrays", () => {
		let seed = 34;
		for (let run = 0; run < 300; run++) {
			const nums = Array.from({ length: run % 20 }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return (seed % 9) - 4;
			}).toSorted((a, b) => a - b);
			for (let target = -5; target <= 5; target++) {
				expect(searchRange(nums, target)).toEqual([
					nums.indexOf(target),
					nums.lastIndexOf(target),
				]);
			}
		}
	});
});
