import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheNumberOfSubarraysWhereBoundaryElementsAreMaximum as numberOfSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let max = 0;
		for (let j = i; j < nums.length; j++) {
			max = Math.max(max, nums[j] ?? 0);
			if (nums[i] === max && nums[j] === max) count++;
		}
	}
	return count;
};

describe("3113. Find the Number of Subarrays Where Boundary Elements Are Maximum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfSubarrays([1, 4, 3, 3, 2])).toBe(6);
		expect(numberOfSubarrays([3, 3, 3])).toBe(6);
		expect(numberOfSubarrays([1])).toBe(1);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3113);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), 1, 4);
			expect(numberOfSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
