import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { setIntersectionSizeAtLeastTwo as intersectionSizeTwo } from ".";

/** Tries every set of points from 0 to 9. */
const byBruteForce = (intervals: number[][]): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << 10; mask++) {
		const covers = intervals.every(([start = 0, end = 0]) => {
			let count = 0;
			for (let x = start; x <= end; x++) if (mask & (1 << x)) count++;
			return count >= 2;
		});
		if (covers) {
			let size = 0;
			for (let bits = mask; bits; bits &= bits - 1) size++;
			best = Math.min(best, size);
		}
	}
	return best;
};

describe("757. Set Intersection Size At Least Two", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			intersectionSizeTwo([
				[1, 3],
				[3, 7],
				[8, 9],
			]),
		).toBe(5);
		expect(
			intersectionSizeTwo([
				[1, 3],
				[1, 4],
				[2, 5],
				[3, 5],
			]),
		).toBe(3);
		expect(
			intersectionSizeTwo([
				[1, 2],
				[2, 3],
				[2, 4],
				[4, 5],
			]),
		).toBe(5);
	});

	it("matches trying every set of points on random intervals", () => {
		const random = createRandom(757);
		for (let run = 0; run < 500; run++) {
			const intervals = Array.from({ length: random.int(1, 6) }, () => {
				const start = random.int(0, 8);
				return [start, random.int(start + 1, 9)];
			});
			expect(intersectionSizeTwo(intervals)).toBe(byBruteForce(intervals));
		}
	});
});
