import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { beautifulPairs } from ".";

/** Checks every pair. */
const byBruteForce = (nums1: number[], nums2: number[]): number[] => {
	let best = [Number.POSITIVE_INFINITY, 0, 0];
	for (let i = 0; i < nums1.length; i++)
		for (let j = i + 1; j < nums1.length; j++) {
			const d =
				Math.abs((nums1[i] ?? 0) - (nums1[j] ?? 0)) +
				Math.abs((nums2[i] ?? 0) - (nums2[j] ?? 0));
			if (d < (best[0] ?? 0)) best = [d, i, j];
		}
	return best.slice(1);
};

describe("2613. Beautiful Pairs", () => {
	it("solves the examples from the problem statement", () => {
		expect(beautifulPairs([1, 2, 3, 2, 4], [2, 3, 1, 2, 3])).toEqual([0, 3]);
		expect(beautifulPairs([1, 2, 4, 3, 2, 5], [1, 4, 2, 3, 5, 1])).toEqual([
			1, 4,
		]);
	});

	it("matches checking every pair on random points", () => {
		const random = createRandom(2613);
		for (let run = 0; run < 400; run++) {
			const n = random.int(2, 40);
			const range = random.int(3, 30);
			const nums1 = random.array(n, 0, range);
			const nums2 = random.array(n, 0, range);
			expect(beautifulPairs(nums1, nums2)).toEqual(byBruteForce(nums1, nums2));
		}
	});
});
