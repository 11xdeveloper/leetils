import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumSumQueries } from ".";

/** Scans every index for each query. */
const byBruteForce = (
	nums1: number[],
	nums2: number[],
	queries: number[][],
): number[] =>
	queries.map(([x = 0, y = 0]) =>
		nums1.reduce(
			(best, a, i) =>
				a >= x && (nums2[i] ?? 0) >= y
					? Math.max(best, a + (nums2[i] ?? 0))
					: best,
			-1,
		),
	);

describe("2736. Maximum Sum Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumSumQueries(
				[4, 3, 1, 2],
				[2, 4, 9, 5],
				[
					[4, 1],
					[1, 3],
					[2, 5],
				],
			),
		).toEqual([6, 10, 7]);
		expect(
			maximumSumQueries(
				[3, 2, 5],
				[2, 3, 4],
				[
					[4, 4],
					[3, 2],
					[1, 1],
				],
			),
		).toEqual([9, 9, 9]);
		expect(maximumSumQueries([2, 1], [2, 3], [[3, 3]])).toEqual([-1]);
	});

	it("matches scanning every index on random inputs", () => {
		const random = createRandom(2736);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 10);
			const nums1 = random.array(n, 1, 10);
			const nums2 = random.array(n, 1, 10);
			const queries = Array.from({ length: random.int(1, 6) }, () => [
				random.int(1, 11),
				random.int(1, 11),
			]);
			expect(maximumSumQueries(nums1, nums2, queries)).toEqual(
				byBruteForce(nums1, nums2, queries),
			);
		}
	});
});
