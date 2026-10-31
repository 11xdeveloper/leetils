import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestAlternatingSubarrayAfterRemovingAtMostOneElement as longestAlternating } from ".";

/** Tries every removal and every subarray. */
const byBruteForce = (nums: number[]): number => {
	const longest = (arr: number[]) => {
		let best = 1;
		for (let i = 0; i < arr.length; i++)
			for (let j = i + 1; j < arr.length; j++) {
				const s = Math.sign((arr[j] ?? 0) - (arr[j - 1] ?? 0));
				if (
					s === 0 ||
					(j > i + 1 && s !== -Math.sign((arr[j - 1] ?? 0) - (arr[j - 2] ?? 0)))
				)
					break;
				best = Math.max(best, j - i + 1);
			}
		return best;
	};
	let best = longest(nums);
	for (let r = 0; r < nums.length; r++)
		best = Math.max(best, longest(nums.filter((_, i) => i !== r)));
	return best;
};

describe("3830. Longest Alternating Subarray After Removing At Most One Element", () => {
	it("solves the examples from the problem statement", () => {
		expect(longestAlternating([2, 1, 3, 2])).toBe(4);
		expect(longestAlternating([3, 2, 1, 2, 3, 2, 1])).toBe(4);
		expect(longestAlternating([100000, 100000])).toBe(1);
	});

	it("matches trying every removal on random arrays", () => {
		const random = createRandom(3830);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(2, 12), 1, 4);
			expect(longestAlternating(nums)).toBe(byBruteForce(nums));
		}
	});
});
