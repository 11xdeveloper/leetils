import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubsequenceScore as maxScore } from ".";

/** Tries every choice of `k` indices. */
const byBruteForce = (nums1: number[], nums2: number[], k: number): number => {
	let best = 0;
	for (let mask = 0; mask < 1 << nums1.length; mask++) {
		const picked = nums1.map((_, i) => i).filter((i) => (mask >> i) & 1);
		if (picked.length !== k) continue;
		const sum = picked.reduce((s, i) => s + (nums1[i] ?? 0), 0);
		best = Math.max(best, sum * Math.min(...picked.map((i) => nums2[i] ?? 0)));
	}
	return best;
};

describe("2542. Maximum Subsequence Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxScore([1, 3, 3, 2], [2, 1, 3, 4], 3)).toBe(12);
		expect(maxScore([4, 2, 3, 1, 1], [7, 5, 10, 9, 6], 1)).toBe(30);
	});

	it("matches trying every choice on random inputs", () => {
		const random = createRandom(2542);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 9);
			const nums1 = random.array(n, 0, 10);
			const nums2 = random.array(n, 0, 10);
			const k = random.int(1, n);
			expect(maxScore(nums1, nums2, k)).toBe(byBruteForce(nums1, nums2, k));
		}
	});
});
