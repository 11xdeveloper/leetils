import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSubarraySumAfterAtMostKSwaps as maxSum } from ".";

/** Searches every arrangement reachable within k swaps. */
const byBruteForce = (nums: number[], k: number): number => {
	const bestSubarray = (arr: number[]) => {
		let best = Number.NEGATIVE_INFINITY;
		for (let i = 0; i < arr.length; i++) {
			let s = 0;
			for (let j = i; j < arr.length; j++) {
				s += arr[j] ?? 0;
				best = Math.max(best, s);
			}
		}
		return best;
	};
	let frontier = [nums];
	const seen = new Set([nums.join()]);
	let best = bestSubarray(nums);
	for (let step = 0; step < k; step++) {
		const next: number[][] = [];
		for (const arr of frontier)
			for (let i = 0; i < arr.length; i++)
				for (let j = i + 1; j < arr.length; j++) {
					const swapped = [...arr];
					[swapped[i], swapped[j]] = [swapped[j] ?? 0, swapped[i] ?? 0];
					if (seen.has(swapped.join())) continue;
					seen.add(swapped.join());
					next.push(swapped);
					best = Math.max(best, bestSubarray(swapped));
				}
		frontier = next;
	}
	return best;
};

describe("3962. Maximum Subarray Sum After at Most K Swaps", () => {
	it("solves the examples from the problem statement", () => {
		expect(maxSum([1, -1, 0, 2], 1)).toBe(3);
		expect(maxSum([4, 3, 2, 4], 2)).toBe(13);
		expect(maxSum([-1, -2], 0)).toBe(-1);
	});

	it("matches searching every swap on random arrays", () => {
		const random = createRandom(3962);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 6), -4, 4);
			const k = random.int(0, 2);
			expect(maxSum(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
