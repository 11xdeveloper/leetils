import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { stableSubarraysWithEqualBoundaryAndInteriorSum as countStableSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let l = 0; l < nums.length; l++)
		for (let r = l + 2; r < nums.length; r++) {
			const inner = nums.slice(l + 1, r).reduce((a, b) => a + b, 0);
			if (nums[l] === inner && nums[r] === inner) count++;
		}
	return count;
};

describe("3728. Stable Subarrays With Equal Boundary and Interior Sum", () => {
	it("solves the examples from the problem statement", () => {
		expect(countStableSubarrays([9, 3, 3, 3, 9])).toBe(2);
		expect(countStableSubarrays([1, 2, 3, 4, 5])).toBe(0);
		expect(countStableSubarrays([-4, 4, 0, 0, -8, -4])).toBe(1);
	});

	it("matches checking every subarray on random arrays", () => {
		const random = createRandom(3728);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 12), -3, 3);
			expect(countStableSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
