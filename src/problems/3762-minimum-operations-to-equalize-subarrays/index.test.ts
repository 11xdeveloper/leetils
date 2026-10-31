import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToEqualizeSubarrays as minOperations } from ".";

/** Tries every meeting value in each range. */
const byBruteForce = (
	nums: number[],
	k: number,
	queries: number[][],
): number[] =>
	queries.map(([l = 0, r = 0]) => {
		const part = nums.slice(l, r + 1);
		const residue = (((part[0] ?? 0) % k) + k) % k;
		if (part.some((x) => ((x % k) + k) % k !== residue)) return -1;
		return Math.min(
			...part.map((target) =>
				part.reduce((s, x) => s + Math.abs(x - target) / k, 0),
			),
		);
	});

describe("3762. Minimum Operations to Equalize Subarrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minOperations([1, 4, 7], 3, [
				[0, 1],
				[0, 2],
			]),
		).toEqual([1, 2]);
		expect(
			minOperations([1, 2, 4], 2, [
				[0, 2],
				[0, 0],
				[1, 2],
			]),
		).toEqual([-1, 0, 1]);
	});

	it("matches trying every meeting value on random queries", () => {
		const random = createRandom(3762);
		for (let run = 0; run < 200; run++) {
			const k = random.int(1, 4);
			const nums = random
				.array(random.int(1, 12), 1, 6)
				.map((x) => x * k + (random.int(0, 4) === 0 ? 1 : 0));
			const queries = Array.from({ length: 10 }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1)];
			});
			expect(minOperations(nums, k, queries)).toEqual(
				byBruteForce(nums, k, queries),
			);
		}
	});
});
