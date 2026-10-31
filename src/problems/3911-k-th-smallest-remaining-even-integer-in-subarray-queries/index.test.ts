import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { kThSmallestRemainingEvenIntegerInSubarrayQueries as kthRemainingInteger } from ".";

/** Walks the even numbers. */
const byBruteForce = (nums: number[], queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0, k = 0]) => {
		const removed = new Set(nums.slice(l, r + 1));
		for (let x = 2, left = k; ; x += 2)
			if (!removed.has(x) && --left === 0) return x;
	});

describe("3911. K-th Smallest Remaining Even Integer in Subarray Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			kthRemainingInteger(
				[1, 4, 7],
				[
					[0, 2, 1],
					[1, 1, 2],
					[0, 0, 3],
				],
			),
		).toEqual([2, 6, 6]);
		expect(
			kthRemainingInteger(
				[2, 5, 8],
				[
					[0, 1, 2],
					[1, 2, 1],
					[0, 2, 4],
				],
			),
		).toEqual([6, 2, 12]);
		expect(
			kthRemainingInteger(
				[3, 6],
				[
					[0, 1, 1],
					[1, 1, 3],
				],
			),
		).toEqual([2, 8]);
	});

	it("matches walking the even numbers on random queries", () => {
		const random = createRandom(3911);
		for (let run = 0; run < 200; run++) {
			const nums = [...new Set(random.array(random.int(1, 10), 1, 30))].sort(
				(a, b) => a - b,
			);
			const queries = Array.from({ length: 8 }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1), random.int(1, 12)];
			});
			expect(kthRemainingInteger(nums, queries)).toEqual(
				byBruteForce(nums, queries),
			);
		}
	});
});
