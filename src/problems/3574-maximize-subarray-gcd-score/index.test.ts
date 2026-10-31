import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximizeSubarrayGcdScore as maxGCDScore } from ".";

/** Tries every set of doublings on every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
	let best = 0;
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let bits = 0;
		for (let m = mask; m; m &= m - 1) bits++;
		if (bits > k) continue;
		const doubled = nums.map((x, i) => ((mask >> i) & 1 ? 2 * x : x));
		for (let i = 0; i < nums.length; i++) {
			let g = 0;
			for (let j = i; j < nums.length; j++) {
				g = gcd(g, doubled[j] ?? 0);
				best = Math.max(best, (j - i + 1) * g);
			}
		}
	}
	return best;
};

describe("3574. Maximize Subarray GCD Score", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxGCDScore([2, 4], 1)).toBe(8);
		expect(maxGCDScore([3, 5, 7], 2)).toBe(14);
		expect(maxGCDScore([5, 5, 5], 1)).toBe(15);
	});

	it("matches trying every doubling on random arrays", () => {
		const random = createRandom(3574);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), 1, 24);
			const k = random.int(1, nums.length);
			expect(maxGCDScore(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
