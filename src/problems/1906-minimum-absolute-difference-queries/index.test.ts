import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumAbsoluteDifferenceQueries as minDifference } from ".";

describe("1906. Minimum Absolute Difference Queries", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minDifference(
				[1, 3, 4, 8],
				[
					[0, 1],
					[1, 2],
					[2, 3],
					[0, 3],
				],
			),
		).toEqual([2, 1, 4, 1]);
		expect(
			minDifference(
				[4, 5, 2, 2, 7, 10],
				[
					[2, 3],
					[0, 2],
					[0, 5],
					[3, 5],
				],
			),
		).toEqual([-1, 1, 1, 3]);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1906);
		for (let run = 0; run < 200; run++) {
			const nums = random.array(random.int(2, 12), 1, 100);
			const queries = Array.from({ length: 8 }, () => {
				const l = random.int(0, nums.length - 2);
				return [l, random.int(l + 1, nums.length - 1)];
			});
			const expected = queries.map(([l = 0, r = 0]) => {
				let best = Infinity;
				for (let i = l; i <= r; i++) {
					for (let j = l; j <= r; j++) {
						const d = Math.abs((nums[i] ?? 0) - (nums[j] ?? 0));
						if (d > 0) best = Math.min(best, d);
					}
				}
				return best === Infinity ? -1 : best;
			});
			expect(minDifference(nums, queries)).toEqual(expected);
		}
	});
});
