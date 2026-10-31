import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumStabilityFactorOfArray as minStable } from ".";

/** Tries every set of positions to change to 1. */
const byBruteForce = (nums: number[], maxC: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let best = nums.length;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let bits = 0;
		for (let m = mask; m; m &= m - 1) bits++;
		if (bits > maxC) continue;
		const arr = nums.map((x, i) => ((mask >> i) & 1 ? 1 : x));
		let longest = 0;
		for (let i = 0; i < arr.length; i++) {
			let g = 0;
			for (let j = i; j < arr.length; j++) {
				g = gcd(g, arr[j] ?? 0);
				if (g >= 2) longest = Math.max(longest, j - i + 1);
			}
		}
		best = Math.min(best, longest);
	}
	return best;
};

describe("3605. Minimum Stability Factor of Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(minStable([3, 5, 10], 1)).toBe(1);
		expect(minStable([2, 6, 8], 2)).toBe(1);
		expect(minStable([2, 4, 9, 6], 1)).toBe(2);
	});

	it("matches trying every change on random arrays", () => {
		const random = createRandom(3605);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 9), 1, 12);
			const maxC = random.int(0, nums.length);
			expect(minStable(nums, maxC)).toBe(byBruteForce(nums, maxC));
		}
	});
});
