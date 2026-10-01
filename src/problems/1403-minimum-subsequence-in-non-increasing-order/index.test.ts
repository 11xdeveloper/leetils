import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSubsequenceInNonIncreasingOrder as minSubsequence } from ".";

/** The smallest subset (largest sum on ties) beating the rest, found by trying every subset. */
const byBruteForce = (nums: number[]): number[] => {
	const total = nums.reduce((s, x) => s + x, 0);
	let best: number[] | undefined;
	for (let mask = 1; mask < 2 ** nums.length; mask++) {
		const chosen = nums.filter((_, i) => mask & (1 << i));
		const sum = chosen.reduce((s, x) => s + x, 0);
		if (2 * sum <= total) continue;
		const bestSum = best?.reduce((s, x) => s + x, 0) ?? 0;
		if (
			!best ||
			chosen.length < best.length ||
			(chosen.length === best.length && sum > bestSum)
		)
			best = chosen;
	}
	return (best ?? []).sort((a, b) => b - a);
};

describe("1403. Minimum Subsequence in Non-Increasing Order", () => {
	it("solves the examples from the problem statement", () => {
		expect(minSubsequence([4, 3, 10, 9, 8])).toEqual([10, 9]);
		expect(minSubsequence([4, 4, 7, 6, 7])).toEqual([7, 7, 6]);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(1403);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 10), 1, 20);
			expect(minSubsequence(nums)).toEqual(byBruteForce(nums));
		}
	});
});
