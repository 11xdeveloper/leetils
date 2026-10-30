import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToMaximizeLastElementsInArrays as minOperations } from ".";

/** Tries every set of swaps. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const n = nums1.length;
	let best = -1;
	for (let mask = 0; mask < 1 << n; mask++) {
		const a = nums1.map((x, i) => ((mask >> i) & 1 ? (nums2[i] ?? 0) : x));
		const b = nums2.map((x, i) => ((mask >> i) & 1 ? (nums1[i] ?? 0) : x));
		if (a[n - 1] === Math.max(...a) && b[n - 1] === Math.max(...b)) {
			const swaps = mask.toString(2).replaceAll("0", "").length;
			if (best === -1 || swaps < best) best = swaps;
		}
	}
	return best;
};

describe("2934. Minimum Operations to Maximize Last Elements in Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(minOperations([1, 2, 7], [4, 5, 3])).toBe(1);
		expect(minOperations([2, 3, 4, 5, 9], [8, 8, 4, 4, 4])).toBe(2);
		expect(minOperations([1, 5, 4], [2, 5, 3])).toBe(-1);
	});

	it("matches trying every set of swaps on random inputs", () => {
		const random = createRandom(2934);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 8);
			const nums1 = random.array(n, 1, 9);
			const nums2 = random.array(n, 1, 9);
			expect(minOperations(nums1, nums2)).toBe(byBruteForce(nums1, nums2));
		}
	});
});
