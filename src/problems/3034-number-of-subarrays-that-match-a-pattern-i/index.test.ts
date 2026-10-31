import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfSubarraysThatMatchAPatternI as countMatchingSubarrays } from ".";

/** Checks every starting position. */
const byBruteForce = (nums: number[], pattern: number[]): number => {
	let count = 0;
	for (let i = 0; i + pattern.length < nums.length; i++)
		if (
			pattern.every(
				(p, k) => Math.sign((nums[i + k + 1] ?? 0) - (nums[i + k] ?? 0)) === p,
			)
		)
			count++;
	return count;
};

describe("3034. Number of Subarrays That Match a Pattern I", () => {
	it("solves the examples from the problem statement", () => {
		expect(countMatchingSubarrays([1, 2, 3, 4, 5, 6], [1, 1])).toBe(4);
		expect(countMatchingSubarrays([1, 4, 4, 1, 3, 5, 5, 3], [1, 0, -1])).toBe(
			2,
		);
	});

	it("matches checking every position on random arrays", () => {
		const random = createRandom(3034);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 15), 1, 3);
			const pattern = random.array(
				random.int(1, Math.min(4, nums.length - 1)),
				-1,
				1,
			);
			expect(countMatchingSubarrays(nums, pattern)).toBe(
				byBruteForce(nums, pattern),
			);
		}
	});
});
