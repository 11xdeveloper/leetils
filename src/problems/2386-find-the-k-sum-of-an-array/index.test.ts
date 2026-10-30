import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheKSumOfAnArray as kSum } from ".";

/** Sorts every subsequence sum. */
const byBruteForce = (nums: number[], k: number): number => {
	const sums: number[] = [];
	for (let mask = 0; mask < 1 << nums.length; mask++) {
		let sum = 0;
		for (const [i, num] of nums.entries()) if (mask & (1 << i)) sum += num;
		sums.push(sum);
	}
	return sums.sort((a, b) => b - a)[k - 1] ?? 0;
};

describe("2386. Find the K-Sum of an Array", () => {
	it("solves the examples from the problem statement", () => {
		expect(kSum([2, 4, -2], 5)).toBe(2);
		expect(kSum([1, -2, 3, 4, -10, 12], 16)).toBe(10);
	});

	it("matches sorting every sum on random inputs", () => {
		const random = createRandom(2386);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 8), -9, 9);
			const k = random.int(1, 2 ** nums.length);
			expect(kSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
