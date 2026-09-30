import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestSubarrayWithSumAtLeastK as shortestSubarray } from ".";

const byBruteForce = (nums: number[], k: number): number => {
	let shortest = Number.POSITIVE_INFINITY;
	for (let i = 0; i < nums.length; i++) {
		let sum = 0;
		for (let j = i; j < nums.length; j++) {
			sum += nums[j] ?? 0;
			if (sum >= k) shortest = Math.min(shortest, j - i + 1);
		}
	}
	return shortest === Number.POSITIVE_INFINITY ? -1 : shortest;
};

describe("862. Shortest Subarray with Sum at Least K", () => {
	it("solves the examples from the problem statement", () => {
		expect(shortestSubarray([1], 1)).toBe(1);
		expect(shortestSubarray([1, 2], 4)).toBe(-1);
		expect(shortestSubarray([2, -1, 2], 3)).toBe(3);
	});

	it("matches checking every subarray on random inputs", () => {
		const random = createRandom(862);
		for (let run = 0; run < 1000; run++) {
			const nums = random.array(random.int(1, 15), -5, 8);
			const k = random.int(1, 15);
			expect(shortestSubarray(nums, k)).toBe(byBruteForce(nums, k));
		}
	});
});
