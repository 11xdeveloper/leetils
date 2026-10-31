import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countNonDecreasingSubarraysAfterKOperations as countNonDecreasingSubarrays } from ".";

/** Prices every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let max = 0;
		let cost = 0;
		for (let j = i; j < nums.length; j++) {
			max = Math.max(max, nums[j] ?? 0);
			cost += max - (nums[j] ?? 0);
			if (cost <= k) count++;
		}
	}
	return count;
};

describe("3420. Count Non-Decreasing Subarrays After K Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(countNonDecreasingSubarrays([6, 3, 1, 2, 4, 4], 7)).toBe(17);
		expect(countNonDecreasingSubarrays([6, 3, 1, 3, 6], 4)).toBe(12);
	});

	it("matches pricing every subarray on random arrays", () => {
		const random = createRandom(3420);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 8);
			const k = random.int(0, 12);
			expect(countNonDecreasingSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
