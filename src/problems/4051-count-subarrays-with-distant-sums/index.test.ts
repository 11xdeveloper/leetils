import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithDistantSums as distantSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], goal: number, k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let s = 0;
		for (let j = i; j < nums.length; j++) {
			s += nums[j] ?? 0;
			if (Math.abs(s - goal) >= k) count++;
		}
	}
	return count;
};

describe("4051. Count Subarrays with Distant Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(distantSubarrays([1, 2, 1], 4, 1)).toBe(5);
		expect(distantSubarrays([2, -1, 3], 2, 2)).toBe(2);
		expect(distantSubarrays([-3, 1, 2], 0, 3)).toBe(2);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(4051);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -5, 5);
			const goal = random.int(-6, 6);
			const k = random.int(0, 6);
			expect(distantSubarrays(nums, goal, k)).toBe(byBruteForce(nums, goal, k));
		}
	});
});
