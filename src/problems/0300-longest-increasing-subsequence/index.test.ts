import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestIncreasingSubsequence as lis } from ".";

/** Quadratic dynamic programming: the longest run ending at each index. */
const byDynamicProgramming = (nums: number[]): number => {
	const ending = nums.map(() => 1);
	for (let i = 0; i < nums.length; i++) {
		for (let j = 0; j < i; j++) {
			if ((nums[j] ?? 0) < (nums[i] ?? 0))
				ending[i] = Math.max(ending[i] ?? 1, (ending[j] ?? 1) + 1);
		}
	}
	return Math.max(0, ...ending);
};

describe("300. Longest Increasing Subsequence", () => {
	it("solves the examples from the problem statement", () => {
		expect(lis([10, 9, 2, 5, 3, 7, 101, 18])).toBe(4);
		expect(lis([0, 1, 0, 3, 2, 3])).toBe(4);
		expect(lis([7, 7, 7, 7, 7, 7, 7])).toBe(1);
	});

	it("requires strictly increasing values", () => {
		expect(lis([1, 2, 2, 3])).toBe(3);
	});

	it("matches quadratic dynamic programming on random inputs", () => {
		const random = createRandom(300);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 25), -10, 10);
			expect(lis(nums)).toBe(byDynamicProgramming(nums));
		}
	});
});
