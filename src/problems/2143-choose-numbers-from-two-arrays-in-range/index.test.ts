import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { chooseNumbersFromTwoArraysInRange as countSubranges } from ".";

/** Tries every range and every choice within it. */
const byBruteForce = (nums1: number[], nums2: number[]): number => {
	let count = 0;
	for (let l = 0; l < nums1.length; l++) {
		for (let r = l; r < nums1.length; r++) {
			for (let mask = 0; mask < 1 << (r - l + 1); mask++) {
				let balance = 0;
				for (let i = l; i <= r; i++)
					balance += mask & (1 << (i - l)) ? (nums1[i] ?? 0) : -(nums2[i] ?? 0);
				if (balance === 0) count++;
			}
		}
	}
	return count;
};

describe("2143. Choose Numbers From Two Arrays in Range", () => {
	it("solves the examples from the problem statement", () => {
		expect(countSubranges([1, 2, 5], [2, 6, 3])).toBe(3);
		expect(countSubranges([0, 1], [1, 0])).toBe(4);
	});

	it("matches trying every range on random inputs", () => {
		const random = createRandom(2143);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 7);
			const nums1 = random.array(n, 0, 4);
			const nums2 = random.array(n, 0, 4);
			expect(countSubranges(nums1, nums2)).toBe(byBruteForce(nums1, nums2));
		}
	});
});
