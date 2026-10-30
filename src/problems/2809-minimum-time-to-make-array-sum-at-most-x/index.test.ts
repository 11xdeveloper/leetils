import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToMakeArraySumAtMostX as minimumTime } from ".";

/** Tries every sequence of resets for a few seconds. */
const byBruteForce = (nums1: number[], nums2: number[], x: number): number => {
	let states = [nums1];
	for (let t = 0; t <= nums1.length + 1; t++) {
		if (states.some((s) => s.reduce((a, b) => a + b, 0) <= x)) return t;
		states = states.flatMap((s) => {
			const grown = s.map((v, i) => v + (nums2[i] ?? 0));
			return grown.map((_, i) => grown.map((v, j) => (i === j ? 0 : v)));
		});
	}
	return -1;
};

describe("2809. Minimum Time to Make Array Sum At Most x", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumTime([1, 2, 3], [1, 2, 3], 4)).toBe(3);
		expect(minimumTime([1, 2, 3], [3, 3, 3], 4)).toBe(-1);
	});

	it("matches trying every reset sequence on random inputs", () => {
		const random = createRandom(2809);
		for (let run = 0; run < 150; run++) {
			const n = random.int(1, 4);
			const nums1 = random.array(n, 1, 6);
			const nums2 = random.array(n, 0, 4);
			const x = random.int(0, 15);
			expect(minimumTime(nums1, nums2, x)).toBe(byBruteForce(nums1, nums2, x));
		}
	});
});
