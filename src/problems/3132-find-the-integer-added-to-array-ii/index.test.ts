import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheIntegerAddedToArrayII as minimumAddedInteger } from ".";

/** Tries removing every pair. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const target = nums2.toSorted((a, b) => a - b).join();
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < nums1.length; i++)
		for (let j = i + 1; j < nums1.length; j++) {
			const rest = nums1
				.filter((_, k) => k !== i && k !== j)
				.sort((a, b) => a - b);
			const x = (nums2.toSorted((a, b) => a - b)[0] ?? 0) - (rest[0] ?? 0);
			if (rest.map((v) => v + x).join() === target) best = Math.min(best, x);
		}
	return best;
};

describe("3132. Find the Integer Added to Array II", () => {
	it("solves the examples from the problem statement", () => {
		expect(minimumAddedInteger([4, 20, 16, 12, 8], [14, 18, 10])).toBe(-2);
		expect(minimumAddedInteger([3, 5, 5, 3], [7, 7])).toBe(2);
	});

	it("matches trying every removal on random arrays", () => {
		const random = createRandom(3132);
		for (let run = 0; run < 300; run++) {
			const kept = random.array(random.int(1, 6), 0, 6);
			const x = random.int(-3, 3);
			const nums1 = [...kept, random.int(0, 6), random.int(0, 6)].sort(
				() => random.next() - 0.5,
			);
			const nums2 = kept.map((v) => v + x);
			expect(minimumAddedInteger(nums1, nums2)).toBe(
				byBruteForce(nums1, nums2),
			);
		}
	});
});
