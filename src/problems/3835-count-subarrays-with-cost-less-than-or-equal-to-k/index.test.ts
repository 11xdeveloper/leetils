import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithCostLessThanOrEqualToK as countSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++)
		for (let j = i; j < nums.length; j++) {
			const part = nums.slice(i, j + 1);
			if ((Math.max(...part) - Math.min(...part)) * part.length <= k) count++;
		}
	return count;
};

describe("3835. Count Subarrays With Cost Less Than or Equal to K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 3, 2], 4)).toBe(5);
		expect(countSubarrays([5, 5, 5, 5], 0)).toBe(10);
		expect(countSubarrays([1, 2, 3], 0)).toBe(3);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3835);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 6);
			const k = random.int(0, 20);
			expect(countSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
