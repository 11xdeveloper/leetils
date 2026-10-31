import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subarraysWithXorAtLeastK as countXorSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let x = 0;
		for (let j = i; j < nums.length; j++) {
			x ^= nums[j] ?? 0;
			if (x >= k) count++;
		}
	}
	return count;
};

describe("3632. Subarrays with XOR at Least K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countXorSubarrays([3, 1, 2, 3], 2)).toBe(6);
		expect(countXorSubarrays([0, 0, 0], 0)).toBe(6);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3632);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 0, 15);
			const k = random.int(0, 16);
			expect(countXorSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
