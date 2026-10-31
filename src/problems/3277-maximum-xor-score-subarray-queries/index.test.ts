import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumXorScoreSubarrayQueries as maximumSubarrayXor } from ".";

const score = (arr: number[]): number => {
	let a = [...arr];
	while (a.length > 1) a = a.slice(1).map((v, i) => v ^ (a[i] ?? 0));
	return a[0] ?? 0;
};

/** Scores every subarray of every query range. */
const byBruteForce = (nums: number[], queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0]) => {
		let best = 0;
		for (let i = l; i <= r; i++)
			for (let j = i; j <= r; j++)
				best = Math.max(best, score(nums.slice(i, j + 1)));
		return best;
	});

describe("3277. Maximum XOR Score Subarray Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSubarrayXor(
				[2, 8, 4, 32, 16, 1],
				[
					[0, 2],
					[1, 4],
					[0, 5],
				],
			),
		).toEqual([12, 60, 60]);
		expect(
			maximumSubarrayXor(
				[0, 7, 3, 2, 8, 5, 1],
				[
					[0, 3],
					[1, 5],
					[2, 4],
					[2, 6],
					[5, 6],
				],
			),
		).toEqual([7, 14, 11, 14, 5]);
	});

	it("matches scoring every subarray on random queries", () => {
		const random = createRandom(3277);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 8), 0, 31);
			const queries = Array.from({ length: 4 }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1)];
			});
			expect(maximumSubarrayXor(nums, queries)).toEqual(
				byBruteForce(nums, queries),
			);
		}
	});
});
