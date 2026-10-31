import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestSubarrayWithRestrictedPairSums as maxSubarray } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let best = 0;
	for (let l = 0; l < nums.length; l++)
		for (let r = l; r < nums.length; r++) {
			let valid = true;
			for (let i = l; i <= r && valid; i++)
				for (let j = l; j <= r && valid; j++)
					for (let k = l; k <= r && valid; k++)
						if (
							i !== j &&
							j !== k &&
							i !== k &&
							(nums[i] ?? 0) + (nums[j] ?? 0) === nums[k]
						)
							valid = false;
			if (valid) best = Math.max(best, r - l + 1);
		}
	return best;
};

describe("4067. Longest Subarray With Restricted Pair Sums", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarray([2, 3, 5, 3, 2, 1])).toBe(3);
		expect(maxSubarray([3, 4, 5, 6])).toBe(4);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(4067);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 9), 1, 8);
			expect(maxSubarray(nums)).toBe(byBruteForce(nums));
		}
	});
});
