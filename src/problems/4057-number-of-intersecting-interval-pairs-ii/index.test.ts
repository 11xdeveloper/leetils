import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfIntersectingIntervalPairsI } from "../4056-number-of-intersecting-interval-pairs-i";
import { numberOfIntersectingIntervalPairsII as countIntersectingIntervals } from ".";

describe("4057. Number of Intersecting Interval Pairs II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			countIntersectingIntervals([
				[1, 2],
				[2, 3],
				[3, 4],
			]),
		).toBe(2);
		expect(
			countIntersectingIntervals([
				[1, 5],
				[2, 4],
				[3, 6],
			]),
		).toBe(3);
		expect(
			countIntersectingIntervals([
				[1, 2],
				[3, 4],
				[5, 6],
			]),
		).toBe(0);
	});

	it("matches part I on random intervals", () => {
		const random = createRandom(4057);
		for (let run = 0; run < 300; run++) {
			const intervals = Array.from({ length: random.int(2, 12) }, () => {
				const a = random.int(0, 10);
				return [a, random.int(a, 12)];
			});
			expect(countIntersectingIntervals(intervals)).toBe(
				numberOfIntersectingIntervalPairsI(intervals),
			);
		}
	});
});
