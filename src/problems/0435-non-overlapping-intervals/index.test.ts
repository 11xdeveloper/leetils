import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { nonOverlappingIntervals } from ".";

const byBruteForce = (intervals: number[][]): number => {
	let most = 0;
	for (let mask = 0; mask < 1 << intervals.length; mask++) {
		const chosen = intervals.filter((_, i) => mask & (1 << i));
		const ok = chosen.every(([a0 = 0, a1 = 0], i) =>
			chosen.every(([b0 = 0, b1 = 0], j) => i === j || a1 <= b0 || b1 <= a0),
		);
		if (ok) most = Math.max(most, chosen.length);
	}
	return intervals.length - most;
};

describe("435. Non-overlapping Intervals", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			nonOverlappingIntervals([
				[1, 2],
				[2, 3],
				[3, 4],
				[1, 3],
			]),
		).toBe(1);
		expect(
			nonOverlappingIntervals([
				[1, 2],
				[1, 2],
				[1, 2],
			]),
		).toBe(2);
		expect(
			nonOverlappingIntervals([
				[1, 2],
				[2, 3],
			]),
		).toBe(0);
	});

	it("matches trying every subset on random inputs", () => {
		const random = createRandom(435);
		for (let run = 0; run < 500; run++) {
			const intervals = Array.from({ length: random.int(1, 10) }, () => {
				const start = random.int(-10, 10);
				return [start, start + random.int(1, 6)];
			});
			expect(nonOverlappingIntervals(intervals)).toBe(byBruteForce(intervals));
		}
	});
});
