import { describe, expect, it } from "bun:test";
import { medianOfTwoSortedArrays } from ".";

/** Deterministic pseudo-random integers, so failures are reproducible. */
const random = (seed: number) => () => {
	seed = (seed * 1103515245 + 12345) % 2 ** 31;
	return seed;
};

const sortedArray = (next: () => number, length: number): number[] =>
	Array.from({ length }, () => (next() % 200) - 100).sort((a, b) => a - b);

const medianBySorting = (a: number[], b: number[]): number => {
	const merged = [...a, ...b].sort((x, y) => x - y);
	const middle = Math.floor(merged.length / 2);
	return merged.length % 2 === 1
		? (merged[middle] ?? Number.NaN)
		: ((merged[middle - 1] ?? Number.NaN) + (merged[middle] ?? Number.NaN)) / 2;
};

describe("4. Median of Two Sorted Arrays", () => {
	it("solves the examples from the problem statement", () => {
		expect(medianOfTwoSortedArrays([1, 3], [2])).toBe(2);
		expect(medianOfTwoSortedArrays([1, 2], [3, 4])).toBe(2.5);
	});

	it("handles one empty array on either side", () => {
		expect(medianOfTwoSortedArrays([], [1])).toBe(1);
		expect(medianOfTwoSortedArrays([2], [])).toBe(2);
		expect(medianOfTwoSortedArrays([], [2, 3])).toBe(2.5);
	});

	it("handles arrays that don't overlap", () => {
		expect(medianOfTwoSortedArrays([1, 2, 3, 4, 5], [6, 7, 8, 9, 10])).toBe(
			5.5,
		);
		expect(medianOfTwoSortedArrays([6, 7, 8], [1, 2])).toBe(6);
	});

	it("handles interleaved values, duplicates and negatives", () => {
		expect(medianOfTwoSortedArrays([1, 3, 5, 7], [2, 4, 6, 8, 9])).toBe(5);
		expect(medianOfTwoSortedArrays([1, 1, 1], [1, 1, 1])).toBe(1);
		expect(medianOfTwoSortedArrays([-2, -1], [3, 4])).toBe(1);
		expect(medianOfTwoSortedArrays([-1, 1], [0])).toBe(0);
	});

	it("handles values at the limits of the constraints", () => {
		expect(medianOfTwoSortedArrays([-1e6], [1e6])).toBe(0);
		expect(medianOfTwoSortedArrays([999999, 1e6], [1000001, 1000002])).toBe(
			1000000.5,
		);
	});

	it("matches merging and sorting on random inputs", () => {
		const next = random(42);
		for (let run = 0; run < 500; run++) {
			const a = sortedArray(next, next() % 12);
			const b = sortedArray(next, (next() % 12) + (a.length === 0 ? 1 : 0));
			expect(medianOfTwoSortedArrays(a, b)).toBe(medianBySorting(a, b));
		}
	});
});
