import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { subsequenceSumAfterCappingElements as subsequenceSumAfterCapping } from ".";

/** Tries every subsequence for every cap. */
const byBruteForce = (nums: number[], k: number): boolean[] =>
	nums.map((_, i) => {
		const capped = nums.map((v) => Math.min(v, i + 1));
		for (let mask = 0; mask < 1 << nums.length; mask++)
			if (capped.reduce((s, v, j) => ((mask >> j) & 1 ? s + v : s), 0) === k)
				return true;
		return false;
	});

describe("3685. Subsequence Sum After Capping Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(subsequenceSumAfterCapping([4, 3, 2, 4], 5)).toEqual([
			false,
			false,
			true,
			true,
		]);
		expect(subsequenceSumAfterCapping([1, 2, 3, 4, 5], 3)).toEqual([
			true,
			true,
			true,
			true,
			true,
		]);
	});

	it("matches trying every subsequence on random arrays", () => {
		const random = createRandom(3685);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 8);
			const nums = random.array(n, 1, n);
			const k = random.int(1, 20);
			expect(subsequenceSumAfterCapping(nums, k)).toEqual(
				byBruteForce(nums, k),
			);
		}
	});
});
