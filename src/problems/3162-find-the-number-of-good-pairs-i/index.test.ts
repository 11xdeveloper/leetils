import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheNumberOfGoodPairsI as numberOfPairs } from ".";

/** Checks every pair. */
const byBruteForce = (nums1: number[], nums2: number[], k: number): number => {
	let pairs = 0;
	for (const a of nums1) for (const b of nums2) if (a % (b * k) === 0) pairs++;
	return pairs;
};

describe("3162. Find the Number of Good Pairs I", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfPairs([1, 3, 4], [1, 3, 4], 1)).toBe(5);
		expect(numberOfPairs([1, 2, 4, 12], [2, 4], 3)).toBe(2);
	});

	it("matches checking every pair on random arrays", () => {
		const random = createRandom(3162);
		for (let run = 0; run < 300; run++) {
			const nums1 = random.array(random.int(1, 10), 1, 50);
			const nums2 = random.array(random.int(1, 10), 1, 10);
			const k = random.int(1, 5);
			expect(numberOfPairs(nums1, nums2, k)).toBe(
				byBruteForce(nums1, nums2, k),
			);
		}
	});
});
