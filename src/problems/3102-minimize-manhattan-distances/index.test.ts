import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimizeManhattanDistances as minimumDistance } from ".";

/** Removes each point and checks every pair. */
const byBruteForce = (points: number[][]): number => {
	let best = Number.POSITIVE_INFINITY;
	for (let skip = 0; skip < points.length; skip++) {
		let widest = 0;
		for (let i = 0; i < points.length; i++)
			for (let j = i + 1; j < points.length; j++) {
				if (i === skip || j === skip) continue;
				const [a = 0, b = 0] = points[i] ?? [];
				const [c = 0, d = 0] = points[j] ?? [];
				widest = Math.max(widest, Math.abs(a - c) + Math.abs(b - d));
			}
		best = Math.min(best, widest);
	}
	return best;
};

describe("3102. Minimize Manhattan Distances", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumDistance([
				[3, 10],
				[5, 15],
				[10, 2],
				[4, 4],
			]),
		).toBe(12);
		expect(
			minimumDistance([
				[1, 1],
				[1, 1],
				[1, 1],
			]),
		).toBe(0);
	});

	it("matches checking every removal on random points", () => {
		const random = createRandom(3102);
		for (let run = 0; run < 300; run++) {
			const points = Array.from({ length: random.int(3, 9) }, () => [
				random.int(1, 10),
				random.int(1, 10),
			]);
			expect(minimumDistance(points)).toBe(byBruteForce(points));
		}
	});
});
