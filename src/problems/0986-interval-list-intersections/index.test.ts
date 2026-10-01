import { describe, expect, it } from "bun:test";
import { createRandom, type Random } from "../../testing/random";
import { intervalListIntersections as intervalIntersection } from ".";

const randomIntervals = (random: Random): number[][] => {
	const intervals: number[][] = [];
	for (let t = random.int(0, 3); t < 30; ) {
		const end = t + random.int(0, 4);
		intervals.push([t, end]);
		t = end + random.int(1, 5);
	}
	return intervals;
};

describe("986. Interval List Intersections", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			intervalIntersection(
				[
					[0, 2],
					[5, 10],
					[13, 23],
					[24, 25],
				],
				[
					[1, 5],
					[8, 12],
					[15, 24],
					[25, 26],
				],
			),
		).toEqual([
			[1, 2],
			[5, 5],
			[8, 10],
			[15, 23],
			[24, 24],
			[25, 25],
		]);
		expect(
			intervalIntersection(
				[
					[1, 3],
					[5, 9],
				],
				[],
			),
		).toEqual([]);
	});

	it("matches intersecting point by point on random lists", () => {
		const random = createRandom(986);
		for (let run = 0; run < 500; run++) {
			const [a, b] = [randomIntervals(random), randomIntervals(random)];
			// Doubling coordinates makes every closed interval a run of integer points, including single points.
			const covered = (list: number[][], x: number) =>
				list.some(([s = 0, e = 0]) => 2 * s <= x && x <= 2 * e);
			const expected: number[][] = [];
			for (let x = 0; x <= 80; x++) {
				if (!covered(a, x) || !covered(b, x)) continue;
				const last = expected.at(-1);
				if (last && 2 * (last[1] ?? 0) === x - 1) last[1] = x / 2;
				else if (x % 2 === 0) expected.push([x / 2, x / 2]);
			}
			expect(intervalIntersection(a, b)).toEqual(expected);
		}
	});
});
