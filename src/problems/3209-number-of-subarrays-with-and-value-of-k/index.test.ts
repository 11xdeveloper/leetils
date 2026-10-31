import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubarraysWithAndValueOfK as countSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let and = -1;
		for (let j = i; j < nums.length; j++) {
			and &= nums[j] ?? 0;
			if (and === k) count++;
		}
	}
	return count;
};

describe("3209. Number of Subarrays With AND Value of K", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubarrays([1, 1, 1], 1)).toBe(6);
		expect(countSubarrays([1, 1, 2], 1)).toBe(3);
		expect(countSubarrays([1, 2, 3], 2)).toBe(2);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3209);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 0, 15);
			const k = random.int(0, 15);
			expect(countSubarrays(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
