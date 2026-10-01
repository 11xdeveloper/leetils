import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumIntervalToIncludeEachQuery as minInterval } from ".";

describe("1851. Minimum Interval to Include Each Query", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minInterval(
				[
					[1, 4],
					[2, 4],
					[3, 6],
					[4, 4],
				],
				[2, 3, 4, 5],
			),
		).toEqual([3, 3, 1, 4]);
		expect(
			minInterval(
				[
					[2, 3],
					[2, 5],
					[1, 8],
					[20, 25],
				],
				[2, 19, 5, 22],
			),
		).toEqual([2, -1, 4, 6]);
	});

	it("matches checking every interval on random inputs", () => {
		const random = createRandom(1851);
		for (let run = 0; run < 200; run++) {
			const intervals = Array.from({ length: random.int(1, 8) }, () => {
				const left = random.int(1, 20);
				return [left, random.int(left, 25)];
			});
			const queries = random.array(10, 1, 26);
			const expected = queries.map((q) => {
				const sizes = intervals
					.filter(([l = 0, r = 0]) => l <= q && q <= r)
					.map(([l = 0, r = 0]) => r - l + 1);
				return sizes.length ? Math.min(...sizes) : -1;
			});
			expect(minInterval(intervals, queries)).toEqual(expected);
		}
	});
});
