import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfStableSubsequences as countStableSubsequences } from ".";

/** Tries every subsequence. */
const byBruteForce = (nums: number[]): number => {
	let count = 0;
	for (let mask = 1; mask < 1 << nums.length; mask++) {
		const picked = nums.filter((_, i) => (mask >> i) & 1);
		if (
			picked.every(
				(x, i) =>
					i < 2 ||
					(picked[i - 1] ?? 0) % 2 !== x % 2 ||
					(picked[i - 2] ?? 0) % 2 !== x % 2,
			)
		)
			count++;
	}
	return count;
};

describe("3686. Number of Stable Subsequences", () => {
	it("solves the examples from the problem statement", () => {
		expect(countStableSubsequences([1, 3, 5])).toBe(6);
		expect(countStableSubsequences([2, 3, 4, 2])).toBe(14);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3686);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 9);
			expect(countStableSubsequences(nums)).toBe(byBruteForce(nums));
		}
	});
});
