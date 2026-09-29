import { describe, expect, it } from "bun:test";
import { removeElement } from ".";

/** Runs the solution like LeetCode's judge: checks k and the first k elements. */
const remaining = (input: number[], val: number): number[] => {
	const nums = [...input];
	const k = removeElement(nums, val);
	expect(nums).toHaveLength(input.length);
	return nums.slice(0, k);
};

describe("27. Remove Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(remaining([3, 2, 2, 3], 3)).toEqual([2, 2]);
		expect(remaining([0, 1, 2, 2, 3, 0, 4, 2], 2)).toEqual([0, 1, 3, 0, 4]);
	});

	it("handles empty arrays and values that aren't present", () => {
		expect(remaining([], 1)).toEqual([]);
		expect(remaining([1, 2, 3], 4)).toEqual([1, 2, 3]);
	});

	it("removes every element when they all match", () => {
		expect(remaining([5, 5, 5], 5)).toEqual([]);
	});

	it("modifies the array in place", () => {
		const nums = [3, 2, 2, 3];
		expect(removeElement(nums, 3)).toBe(2);
		expect(nums.slice(0, 2)).toEqual([2, 2]);
	});

	it("matches filtering on random arrays", () => {
		let seed = 27;
		const next = () => {
			seed = (seed * 1103515245 + 12345) % 2 ** 31;
			return seed;
		};
		for (let run = 0; run < 200; run++) {
			const nums = Array.from({ length: run % 20 }, () => next() % 6);
			const val = next() % 6;
			expect(remaining(nums, val)).toEqual(nums.filter((num) => num !== val));
		}
	});
});
