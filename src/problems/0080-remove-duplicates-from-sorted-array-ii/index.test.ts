import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { removeDuplicatesFromSortedArrayII } from ".";

/** Runs the solution like LeetCode's judge: checks k and the first k elements. */
const kept = (input: number[]): number[] => {
	const nums = [...input];
	const k = removeDuplicatesFromSortedArrayII(nums);
	return nums.slice(0, k);
};

const byFiltering = (nums: number[]): number[] =>
	nums.filter((num, i) => i < 2 || num !== nums[i - 2]);

describe("80. Remove Duplicates from Sorted Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(kept([1, 1, 1, 2, 2, 3])).toEqual([1, 1, 2, 2, 3]);
		expect(kept([0, 0, 1, 1, 1, 1, 2, 3, 3])).toEqual([0, 0, 1, 1, 2, 3, 3]);
	});

	it("keeps short arrays unchanged", () => {
		expect(kept([1])).toEqual([1]);
		expect(kept([1, 1])).toEqual([1, 1]);
	});

	it("matches filtering third copies on random sorted arrays", () => {
		const random = createRandom(80);
		for (let run = 0; run < 500; run++) {
			const nums = random
				.array(random.int(1, 20), -3, 3)
				.toSorted((a, b) => a - b);
			expect(kept(nums)).toEqual(byFiltering(nums));
		}
	});
});
