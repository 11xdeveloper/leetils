import { describe, expect, it } from "bun:test";
import { removeDuplicatesFromSortedArray } from ".";

/** Runs the solution like LeetCode's judge: checks k and the first k elements. */
const unique = (input: number[]): number[] => {
	const nums = [...input];
	const k = removeDuplicatesFromSortedArray(nums);
	expect(nums).toHaveLength(input.length);
	return nums.slice(0, k);
};

describe("26. Remove Duplicates from Sorted Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(unique([1, 1, 2])).toEqual([1, 2]);
		expect(unique([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])).toEqual([0, 1, 2, 3, 4]);
	});

	it("handles arrays that are already unique or all the same", () => {
		expect(unique([1])).toEqual([1]);
		expect(unique([-3, -1, 0, 5])).toEqual([-3, -1, 0, 5]);
		expect(unique([7, 7, 7, 7])).toEqual([7]);
	});

	it("modifies the array in place", () => {
		const nums = [1, 1, 2];
		expect(removeDuplicatesFromSortedArray(nums)).toBe(2);
		expect(nums.slice(0, 2)).toEqual([1, 2]);
	});

	it("matches a Set on random sorted arrays", () => {
		let seed = 26;
		for (let run = 0; run < 200; run++) {
			const nums = Array.from({ length: 1 + (run % 20) }, () => {
				seed = (seed * 1103515245 + 12345) % 2 ** 31;
				return (seed % 11) - 5;
			}).toSorted((a, b) => a - b);
			expect(unique(nums)).toEqual([...new Set(nums)]);
		}
	});
});
