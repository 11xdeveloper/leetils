import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countGoodTripletsInAnArray as goodTriplets } from ".";

/** Checks every triplet of values. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	const p1 = new Map(nums1.map((v, i) => [v, i]));
	const p2 = new Map(nums2.map((v, i) => [v, i]));
	const at = (p: Map<number, number>, v: number): number => p.get(v) ?? 0;
	let count = 0;
	const n = nums1.length;
	for (let x = 0; x < n; x++)
		for (let y = 0; y < n; y++)
			for (let z = 0; z < n; z++)
				if (
					at(p1, x) < at(p1, y) &&
					at(p1, y) < at(p1, z) &&
					at(p2, x) < at(p2, y) &&
					at(p2, y) < at(p2, z)
				)
					count++;
	return count;
};

describe("2179. Count Good Triplets in an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(goodTriplets([2, 0, 1, 3], [0, 1, 2, 3])).toBe(1);
		expect(goodTriplets([4, 0, 1, 3, 2], [4, 1, 0, 2, 3])).toBe(4);
	});

	it("matches checking every triplet on random permutations", () => {
		const random = createRandom(2179);
		const shuffle = (n: number): number[] =>
			Array.from({ length: n }, (_, i) => i).sort(() => random.next() - 0.5);
		for (let run = 0; run < 200; run++) {
			const n = random.int(3, 8);
			const [nums1, nums2] = [shuffle(n), shuffle(n)];
			expect(goodTriplets(nums1, nums2)).toBe(byBruteForce(nums1, nums2));
		}
	});
});
