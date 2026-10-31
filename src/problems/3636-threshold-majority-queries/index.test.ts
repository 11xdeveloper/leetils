import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { thresholdMajorityQueries as subarrayMajority } from ".";

/** Counts each range directly. */
const byBruteForce = (nums: number[], queries: number[][]): number[] =>
	queries.map(([l = 0, r = 0, threshold = 0]) => {
		const counts = new Map<number, number>();
		for (let i = l; i <= r; i++)
			counts.set(nums[i] ?? 0, (counts.get(nums[i] ?? 0) ?? 0) + 1);
		let [best, value] = [0, -1];
		for (const [v, c] of counts)
			if (c > best || (c === best && v < value)) [best, value] = [c, v];
		return best >= threshold ? value : -1;
	});

describe("3636. Threshold Majority Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			subarrayMajority(
				[1, 1, 2, 2, 1, 1],
				[
					[0, 5, 4],
					[0, 3, 3],
					[2, 3, 2],
				],
			),
		).toEqual([1, -1, 2]);
		expect(
			subarrayMajority(
				[3, 2, 3, 2, 3, 2, 3],
				[
					[0, 6, 4],
					[1, 5, 2],
					[2, 4, 1],
					[3, 3, 1],
				],
			),
		).toEqual([3, 2, 3, 2]);
	});

	it("matches counting directly on random queries", () => {
		const random = createRandom(3636);
		for (let run = 0; run < 100; run++) {
			const nums = random.array(random.int(1, 40), 1, 5);
			const queries = Array.from({ length: 20 }, () => {
				const l = random.int(0, nums.length - 1);
				const r = random.int(l, nums.length - 1);
				return [l, r, random.int(1, r - l + 1)];
			});
			expect(subarrayMajority(nums, queries)).toEqual(
				byBruteForce(nums, queries),
			);
		}
	});
});
