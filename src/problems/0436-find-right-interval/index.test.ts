import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findRightInterval } from ".";

const byBruteForce = (intervals: number[][]): number[] =>
	intervals.map(([, end = 0]) => {
		let best = -1;
		for (const [j, [start = 0]] of intervals.entries()) {
			if (start >= end && (best === -1 || start < (intervals[best]?.[0] ?? 0)))
				best = j;
		}
		return best;
	});

describe("436. Find Right Interval", () => {
	it("solves the examples from the problem statement", () => {
		expect(findRightInterval([[1, 2]])).toEqual([-1]);
		expect(
			findRightInterval([
				[3, 4],
				[2, 3],
				[1, 2],
			]),
		).toEqual([-1, 0, 1]);
		expect(
			findRightInterval([
				[1, 4],
				[2, 3],
				[3, 4],
			]),
		).toEqual([-1, 2, -1]);
	});

	it("counts an interval as its own right interval when its start equals its end", () => {
		expect(findRightInterval([[5, 5]])).toEqual([0]);
	});

	it("matches checking every interval on random inputs", () => {
		const random = createRandom(436);
		for (let run = 0; run < 500; run++) {
			const starts = [...new Set(random.array(random.int(1, 10), -10, 10))];
			const intervals = starts.map((start) => [
				start,
				start + random.int(0, 8),
			]);
			expect(findRightInterval(intervals)).toEqual(byBruteForce(intervals));
		}
	});
});
