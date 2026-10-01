import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubarraysWithBoundedMaximum as numSubarrayBoundedMax } from ".";

const byBruteForce = (nums: number[], left: number, right: number): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let max = Number.NEGATIVE_INFINITY;
		for (let j = i; j < nums.length; j++) {
			max = Math.max(max, nums[j] ?? 0);
			if (max >= left && max <= right) count++;
		}
	}
	return count;
};

describe("795. Number of Subarrays with Bounded Maximum", () => {
	it("solves the examples from the problem statement", () => {
		expect(numSubarrayBoundedMax([2, 1, 4, 3], 2, 3)).toBe(3);
		expect(numSubarrayBoundedMax([2, 9, 2, 5, 6], 2, 8)).toBe(7);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(795);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 12), 0, 8);
			const left = random.int(0, 8);
			const right = random.int(left, 8);
			expect(numSubarrayBoundedMax(nums, left, right)).toBe(
				byBruteForce(nums, left, right),
			);
		}
	});
});
