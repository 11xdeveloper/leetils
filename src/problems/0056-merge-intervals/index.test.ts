import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { mergeIntervals } from ".";

/** Merges any two overlapping intervals until none overlap. */
const byRepeatedMerging = (intervals: number[][]): number[][] => {
	const result = intervals.map(([start = 0, end = 0]) => [start, end] as const);
	for (let i = 0; i < result.length; i++) {
		for (let j = i + 1; j < result.length; j++) {
			const [a, b] = [result[i], result[j]];
			if (a && b && a[0] <= b[1] && b[0] <= a[1]) {
				result[i] = [Math.min(a[0], b[0]), Math.max(a[1], b[1])];
				result.splice(j, 1);
				j = i;
			}
		}
	}
	return result
		.map(([start, end]) => [start, end])
		.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
};

describe("56. Merge Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			mergeIntervals([
				[1, 3],
				[2, 6],
				[8, 10],
				[15, 18],
			]),
		).toEqual([
			[1, 6],
			[8, 10],
			[15, 18],
		]);
		expect(
			mergeIntervals([
				[1, 4],
				[4, 5],
			]),
		).toEqual([[1, 5]]);
		expect(
			mergeIntervals([
				[4, 7],
				[1, 4],
			]),
		).toEqual([[1, 7]]);
	});

	it("merges intervals contained in others", () => {
		expect(
			mergeIntervals([
				[1, 10],
				[2, 3],
				[4, 5],
			]),
		).toEqual([[1, 10]]);
	});

	it("keeps zero-length intervals", () => {
		expect(
			mergeIntervals([
				[0, 0],
				[1, 1],
			]),
		).toEqual([
			[0, 0],
			[1, 1],
		]);
	});

	it("does not modify the input", () => {
		const intervals = [
			[2, 6],
			[1, 3],
		];
		mergeIntervals(intervals);
		expect(intervals).toEqual([
			[2, 6],
			[1, 3],
		]);
	});

	it("matches repeatedly merging overlapping pairs on random inputs", () => {
		const random = createRandom(56);
		for (let run = 0; run < 300; run++) {
			const intervals = Array.from({ length: random.int(1, 8) }, () => {
				const start = random.int(0, 20);
				return [start, start + random.int(0, 5)];
			});
			expect(mergeIntervals(intervals)).toEqual(byRepeatedMerging(intervals));
		}
	});
});
