import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarraySumAfterMultiplier as maxSubarraySum } from ".";

/** Tries every operation and every subarray. */
const byBruteForce = (nums: number[], k: number): number => {
	const n = nums.length;
	let best = Number.NEGATIVE_INFINITY;
	for (let a = 0; a < n; a++)
		for (let b = a; b < n; b++)
			for (const op of [
				(x: number) => x * k,
				(x: number) => Math.trunc(x / k),
			]) {
				const arr = nums.map((x, i) => (i >= a && i <= b ? op(x) : x));
				for (let i = 0; i < n; i++) {
					let s = 0;
					for (let j = i; j < n; j++) {
						s += arr[j] ?? 0;
						best = Math.max(best, s);
					}
				}
			}
	return best;
};

describe("3976. Maximum Subarray Sum After Multiplier", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSubarraySum([1, -2, 3, 4, -5], 2)).toBe(14);
		expect(maxSubarraySum([-5, -4, -3], 2)).toBe(-1);
	});

	it("matches trying every operation on random arrays", () => {
		const random = createRandom(3976);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 7), -9, 9);
			const k = random.int(1, 4);
			expect(maxSubarraySum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
