import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mergeIntervals } from "../0056-merge-intervals";
import { insertInterval } from ".";

describe("57. Insert Interval", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			insertInterval(
				[
					[1, 3],
					[6, 9],
				],
				[2, 5],
			),
		).toEqual([
			[1, 5],
			[6, 9],
		]);
		expect(
			insertInterval(
				[
					[1, 2],
					[3, 5],
					[6, 7],
					[8, 10],
					[12, 16],
				],
				[4, 8],
			),
		).toEqual([
			[1, 2],
			[3, 10],
			[12, 16],
		]);
	});

	it("inserts into an empty list", () => {
		expect(insertInterval([], [5, 7])).toEqual([[5, 7]]);
	});

	it("inserts before, between and after without merging", () => {
		expect(insertInterval([[3, 4]], [1, 2])).toEqual([
			[1, 2],
			[3, 4],
		]);
		expect(
			insertInterval(
				[
					[1, 2],
					[6, 7],
				],
				[3, 4],
			),
		).toEqual([
			[1, 2],
			[3, 4],
			[6, 7],
		]);
		expect(insertInterval([[1, 2]], [3, 4])).toEqual([
			[1, 2],
			[3, 4],
		]);
	});

	it("merges an interval that touches its neighbours", () => {
		expect(
			insertInterval(
				[
					[1, 2],
					[4, 5],
				],
				[2, 4],
			),
		).toEqual([[1, 5]]);
	});

	it("matches merging all the intervals on random inputs", () => {
		const random = createRandom(57);
		for (let run = 0; run < 300; run++) {
			const intervals = mergeIntervals(
				Array.from({ length: random.int(0, 8) }, () => {
					const start = random.int(0, 30);
					return [start, start + random.int(0, 4)];
				}),
			);
			const start = random.int(0, 30);
			const newInterval = [start, start + random.int(0, 8)];
			expect(insertInterval(intervals, newInterval)).toEqual(
				mergeIntervals([...intervals, newInterval]),
			);
		}
	});
});
