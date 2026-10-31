import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { zeroArrayTransformationIV as minZeroArray } from ".";

/** Tries every subset of each prefix of queries for every index. */
const byBruteForce = (nums: number[], queries: number[][]): number => {
	for (let k = 0; k <= queries.length; k++) {
		const ok = nums.every((num, i) => {
			const covering = queries
				.slice(0, k)
				.filter(([l = 0, r = 0]) => l <= i && i <= r);
			for (let mask = 0; mask < 1 << covering.length; mask++)
				if (
					covering.reduce(
						(sum, q, j) => ((mask >> j) & 1 ? sum + (q[2] ?? 0) : sum),
						0,
					) === num
				)
					return true;
			return false;
		});
		if (ok) return k;
	}
	return -1;
};

describe("3489. Zero Array Transformation IV", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minZeroArray(
				[2, 0, 2],
				[
					[0, 2, 1],
					[0, 2, 1],
					[1, 1, 3],
				],
			),
		).toBe(2);
		expect(
			minZeroArray(
				[4, 3, 2, 1],
				[
					[1, 3, 2],
					[0, 2, 1],
				],
			),
		).toBe(-1);
		expect(
			minZeroArray(
				[1, 2, 3, 2, 1],
				[
					[0, 1, 1],
					[1, 2, 1],
					[2, 3, 2],
					[3, 4, 1],
					[4, 4, 1],
				],
			),
		).toBe(4);
	});

	it("matches trying every subset on random queries", () => {
		const random = createRandom(3489);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(1, 4), 0, 5);
			const queries = Array.from({ length: random.int(1, 6) }, () => {
				const l = random.int(0, nums.length - 1);
				return [l, random.int(l, nums.length - 1), random.int(1, 3)];
			});
			expect(minZeroArray(nums, queries)).toBe(byBruteForce(nums, queries));
		}
	});
});
