import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countBowlSubarrays as bowlSubarrays } from ".";

/** Checks every subarray. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let l = 0; l < nums.length; l++)
		for (let r = l + 2; r < nums.length; r++)
			if (
				Math.min(nums[l] ?? 0, nums[r] ?? 0) > Math.max(...nums.slice(l + 1, r))
			)
				count++;
	return count;
};

describe("3676. Count Bowl Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(bowlSubarrays([2, 5, 3, 1, 4])).toBe(2);
		expect(bowlSubarrays([5, 1, 2, 3, 4])).toBe(3);
		expect(bowlSubarrays([1000000000, 999999999, 999999998])).toBe(0);
	});

	it("matches checking every subarray on random permutations", () => {
		const random = createRandom(3676);
		for (let run = 0; run < 200; run++) {
			const pool = Array.from({ length: 30 }, (_, i) => i);
			const nums = Array.from(
				{ length: random.int(1, 10) },
				() => pool.splice(random.int(0, pool.length - 1), 1)[0] ?? 0,
			);
			expect(bowlSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
