import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { validKUniqueSubarraysI as validSubarrays } from ".";

/** Counts each range directly. */
const byBruteForce = (
	nums: number[],
	k: number,
	queries: number[][],
): boolean[] =>
	queries.map(([l = 0, r = 0]) => {
		const counts = new Map<number, number>();
		for (let i = l; i <= r; i++)
			counts.set(nums[i] ?? 0, (counts.get(nums[i] ?? 0) ?? 0) + 1);
		return counts.size === k && [...counts.values()].every((c) => c % 2 === 0);
	});

describe("4033. Valid K-Unique Subarrays I", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			validSubarrays([1, 2, 2, 1], 2, [
				[0, 1],
				[0, 3],
				[1, 2],
			]),
		).toEqual([false, true, false]);
		expect(
			validSubarrays([3, 3, 3], 1, [
				[1, 2],
				[0, 2],
			]),
		).toEqual([true, false]);
	});

	it("matches counting directly on random queries", () => {
		const random = createRandom(4033);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 14), 1, 4);
			const k = random.int(1, 3);
			const queries = Array.from({ length: 12 }, () => {
				const l = random.int(0, nums.length - 2);
				return [l, random.int(l + 1, nums.length - 1)];
			});
			expect(validSubarrays(nums, k, queries)).toEqual(
				byBruteForce(nums, k, queries),
			);
		}
	});
});
