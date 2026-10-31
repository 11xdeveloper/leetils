import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { sumOfKSubarraysWithLengthAtLeastM as maxSum } from ".";

/** Tries every choice of subarrays. */
const byBruteForce = (nums: number[], k: number, m: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	const choose = (from: number, left: number, sum: number): void => {
		if (left === 0) {
			best = Math.max(best, sum);
			return;
		}
		for (let start = from; start < nums.length; start++) {
			let s = 0;
			for (let end = start; end < nums.length; end++) {
				s += nums[end] ?? 0;
				if (end - start + 1 >= m) choose(end + 1, left - 1, sum + s);
			}
		}
	};
	choose(0, k, 0);
	return best;
};

describe("3473. Sum of K Subarrays With Length at Least M", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([1, 2, -1, 3, 3, 4], 2, 2)).toBe(13);
		expect(maxSum([-10, 3, -1, -2], 4, 1)).toBe(-10);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3473);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 8), -5, 5);
			const m = random.int(1, nums.length);
			const k = random.int(1, Math.floor(nums.length / m));
			expect(maxSum(nums, k, m)).toBe(byBruteForce(nums, k, m));
		}
	});
});
