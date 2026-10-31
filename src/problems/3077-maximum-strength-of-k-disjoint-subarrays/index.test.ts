import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumStrengthOfKDisjointSubarrays as maximumStrength } from ".";

/** Tries every choice of k disjoint subarrays. */
const byBruteForce = (nums: number[], k: number): number => {
	let best = Number.NEGATIVE_INFINITY;
	const choose = (from: number, j: number, strength: number): void => {
		if (j > k) {
			best = Math.max(best, strength);
			return;
		}
		for (let start = from; start < nums.length; start++) {
			let sum = 0;
			for (let end = start; end < nums.length; end++) {
				sum += nums[end] ?? 0;
				choose(
					end + 1,
					j + 1,
					strength + (j % 2 === 1 ? 1 : -1) * (k - j + 1) * sum,
				);
			}
		}
	};
	choose(0, 1, 0);
	return best;
};

describe("3077. Maximum Strength of K Disjoint Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(maximumStrength([1, 2, 3, -1, 2], 3)).toBe(22);
		expect(maximumStrength([12, -2, -2, -2, -2], 5)).toBe(64);
		expect(maximumStrength([-1, -2, -3], 1)).toBe(-1);
	});

	it("matches trying every choice on random arrays", () => {
		const random = createRandom(3077);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 7), -5, 5);
			const k = 2 * random.int(0, Math.floor((nums.length - 1) / 2)) + 1;
			expect(maximumStrength(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
