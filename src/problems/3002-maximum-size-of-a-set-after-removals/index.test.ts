import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSizeOfASetAfterRemovals } from ".";

/** Tries every way to keep half of each array. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const n = nums1.length;
	const keeps = (nums: number[]) => {
		const result: number[][] = [];
		for (let mask = 0; mask < 1 << n; mask++) {
			let bits = 0;
			for (let m = mask; m; m &= m - 1) bits++;
			if (bits === n / 2) result.push(nums.filter((_, i) => (mask >> i) & 1));
		}
		return result;
	};
	let best = 0;
	for (const a of keeps(nums1))
		for (const b of keeps(nums2))
			best = Math.max(best, new Set([...a, ...b]).size);
	return best;
};

describe("3002. Maximum Size of a Set After Removals", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumSizeOfASetAfterRemovals([1, 2, 1, 2], [1, 1, 1, 1])).toBe(2);
		expect(
			maximumSizeOfASetAfterRemovals([1, 2, 3, 4, 5, 6], [2, 3, 2, 3, 2, 3]),
		).toBe(5);
		expect(
			maximumSizeOfASetAfterRemovals([1, 1, 2, 2, 3, 3], [4, 4, 5, 5, 6, 6]),
		).toBe(6);
	});

	it("matches trying every removal on random arrays", () => {
		const random = createRandom(3002);
		for (let run = 0; run < 200; run++) {
			const n = 2 * random.int(1, 4);
			const nums1 = random.array(n, 1, 5);
			const nums2 = random.array(n, 1, 5);
			expect(maximumSizeOfASetAfterRemovals(nums1, nums2)).toBe(
				byBruteForce(nums1, nums2),
			);
		}
	});
});
