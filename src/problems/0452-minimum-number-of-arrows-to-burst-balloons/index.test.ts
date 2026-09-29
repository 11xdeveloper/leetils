import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfArrowsToBurstBalloons as findMinArrowShots } from ".";

/** Tries every set of arrows at balloon ends, which is enough for an optimal answer. */
const byBruteForce = (points: number[][]): number => {
	const ends = [...new Set(points.map((point) => point[1] ?? 0))];
	let best = points.length;
	for (let mask = 0; mask < 1 << ends.length; mask++) {
		const arrows = ends.filter((_, i) => mask & (1 << i));
		if (
			points.every(([start = 0, end = 0]) =>
				arrows.some((x) => start <= x && x <= end),
			)
		) {
			best = Math.min(best, arrows.length);
		}
	}
	return best;
};

describe("452. Minimum Number of Arrows to Burst Balloons", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMinArrowShots([
				[10, 16],
				[2, 8],
				[1, 6],
				[7, 12],
			]),
		).toBe(2);
		expect(
			findMinArrowShots([
				[1, 2],
				[3, 4],
				[5, 6],
				[7, 8],
			]),
		).toBe(4);
		expect(
			findMinArrowShots([
				[1, 2],
				[2, 3],
				[3, 4],
				[4, 5],
			]),
		).toBe(2);
	});

	it("handles the extremes of the 32-bit range", () => {
		expect(findMinArrowShots([[-(2 ** 31), 2 ** 31 - 1]])).toBe(1);
	});

	it("matches trying every set of arrows on random inputs", () => {
		const random = createRandom(452);
		for (let run = 0; run < 500; run++) {
			const points = Array.from({ length: random.int(1, 9) }, () => {
				const start = random.int(-10, 10);
				return [start, start + random.int(0, 6)];
			});
			expect(findMinArrowShots(points)).toBe(byBruteForce(points));
		}
	});
});
