import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { adjacentIncreasingSubarraysDetectionII as maxIncreasingSubarrays } from ".";

/** Tries every k and start. */
const byBruteForce = (nums: number[]): number => {
	const increasing = (from: number, length: number) => {
		for (let i = from + 1; i < from + length; i++)
			if ((nums[i] ?? 0) <= (nums[i - 1] ?? 0)) return false;
		return true;
	};
	let best = 0;
	for (let k = 1; 2 * k <= nums.length; k++)
		for (let a = 0; a + 2 * k <= nums.length; a++)
			if (increasing(a, k) && increasing(a + k, k)) best = k;
	return best;
};

describe("3350. Adjacent Increasing Subarrays Detection II", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxIncreasingSubarrays([2, 5, 7, 8, 9, 2, 3, 4, 3, 1])).toBe(3);
		expect(maxIncreasingSubarrays([1, 2, 3, 4, 4, 4, 4, 5, 6, 7])).toBe(2);
	});

	it("matches trying every k on random arrays", () => {
		const random = createRandom(3350);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), 1, 6);
			expect(maxIncreasingSubarrays(nums)).toBe(byBruteForce(nums));
		}
	});
});
