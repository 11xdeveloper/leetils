import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumOfSubsequenceWithNonAdjacentElements as maximumSumSubsequence } from ".";

/** Reruns the house-robber recurrence after each update. */
const byBruteForce = (nums: number[], queries: number[][]): number => {
	const arr = [...nums];
	let total = 0;
	for (const [pos = 0, x = 0] of queries) {
		arr[pos] = x;
		let [skip, take] = [0, 0];
		for (const v of arr) [skip, take] = [Math.max(skip, take), skip + v];
		total += Math.max(skip, take);
	}
	return total % 1_000_000_007;
};

describe("3165. Maximum Sum of Subsequence With Non-adjacent Elements", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSumSubsequence(
				[3, 5, 9],
				[
					[1, -2],
					[0, -3],
				],
			),
		).toBe(21);
		expect(maximumSumSubsequence([0, -1], [[0, -5]])).toBe(0);
	});

	it("matches rerunning the recurrence on random updates", () => {
		const random = createRandom(3165);
		for (let run = 0; run < 300; run++) {
			const nums = random.array(random.int(1, 9), -5, 9);
			const queries = Array.from({ length: random.int(1, 6) }, () => [
				random.int(0, nums.length - 1),
				random.int(-5, 9),
			]);
			expect(maximumSumSubsequence(nums, queries)).toBe(
				byBruteForce(nums, queries),
			);
		}
	});
});
