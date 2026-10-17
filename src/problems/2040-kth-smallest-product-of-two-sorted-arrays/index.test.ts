import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kthSmallestProductOfTwoSortedArrays as kthSmallestProduct } from ".";

/** Sorts every product. */
const byBruteForce = (nums1: number[], nums2: number[], k: number): number =>
	nums1.flatMap((a) => nums2.map((b) => a * b + 0)).sort((a, b) => a - b)[
		k - 1
	] ?? 0;

describe("2040. Kth Smallest Product of Two Sorted Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(kthSmallestProduct([2, 5], [3, 4], 2)).toBe(8);
		expect(kthSmallestProduct([-4, -2, 0, 3], [2, 4], 6)).toBe(0);
		expect(kthSmallestProduct([-2, -1, 0, 1, 2], [-3, -1, 2, 4, 5], 3)).toBe(
			-6,
		);
	});

	it("handles the extremes of the product range", () => {
		expect(
			kthSmallestProduct([-100_000, 100_000], [-100_000, 100_000], 1),
		).toBe(-10_000_000_000);
		expect(
			kthSmallestProduct([-100_000, 100_000], [-100_000, 100_000], 4),
		).toBe(10_000_000_000);
	});

	it("matches sorting every product on random inputs", () => {
		const random = createRandom(2040);
		for (let run = 0; run < 300; run++) {
			const nums1 = random.array(random.int(1, 6), -5, 5).sort((a, b) => a - b);
			const nums2 = random.array(random.int(1, 6), -5, 5).sort((a, b) => a - b);
			const k = random.int(1, nums1.length * nums2.length);
			expect(kthSmallestProduct(nums1, nums2, k)).toBe(
				byBruteForce(nums1, nums2, k),
			);
		}
	});
});
