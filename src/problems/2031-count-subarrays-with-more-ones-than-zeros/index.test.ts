import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countSubarraysWithMoreOnesThanZeros as moreOnesThanZeros } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let i = 0; i < nums.length; i++) {
		let balance = 0;
		for (let j = i; j < nums.length; j++) {
			balance += nums[j] === 1 ? 1 : -1;
			if (balance > 0) count++;
		}
	}
	return count;
};

describe("2031. Count Subarrays With More Ones Than Zeros", () => {
	it("solves the examples from the problem statement", () => {
		expect(moreOnesThanZeros([0, 1, 1, 0, 1])).toBe(9);
		expect(moreOnesThanZeros([0])).toBe(0);
		expect(moreOnesThanZeros([1])).toBe(1);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(2031);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 20), 0, 1);
			expect(moreOnesThanZeros(nums)).toBe(byBruteForce(nums));
		}
	});
});
