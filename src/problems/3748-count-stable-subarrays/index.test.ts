import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countStableSubarrays } from ".";

/** Checks every subarray of each query range. */
const byBruteForce = (nums: number[], queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0]) => {
		let count = 0;
		for (let i = l; i <= r; i++)
			for (
				let j = i;
				j <= r && (j === i || (nums[j - 1] ?? 0) <= (nums[j] ?? 0));
				j++
			)
				count++;
		return count;
	});

describe("3748. Count Stable Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countStableSubarrays(
				[3, 1, 2],
				[
					[0, 1],
					[1, 2],
					[0, 2],
				],
			),
		).toEqual([2, 3, 4]);
		expect(
			countStableSubarrays(
				[2, 2],
				[
					[0, 1],
					[0, 0],
				],
			),
		).toEqual([3, 1]);
	});

	it("matches checking every subarray on random queries", () => {
		const random = createRandom(3748);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 12), 1, 5);
			const queries = Array.from({ length: 10 }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1)];
			});
			expect(countStableSubarrays(nums, queries)).toEqual(
				byBruteForce(nums, queries),
			);
		}
	});
});
