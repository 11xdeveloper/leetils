import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNumberOfPointsWithCost as maxPoints } from ".";

/** The quadratic dynamic program over each pair of columns. */
const byBruteForce = (points: number[][]): number => {
	let best = [...(points[0] ?? [])];
	for (const row of points.slice(1))
		best = row.map(
			(value, c) =>
				value + Math.max(...best.map((b, j) => b - Math.abs(c - j))),
		);
	return Math.max(...best);
};

describe("1937. Maximum Number of Points with Cost", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPoints([
				[1, 2, 3],
				[1, 5, 1],
				[3, 1, 1],
			]),
		).toBe(9);
		expect(
			maxPoints([
				[1, 5],
				[2, 3],
				[4, 2],
			]),
		).toBe(11);
	});

	it("matches the quadratic dynamic program on random grids", () => {
		const random = createRandom(1937);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 6);
			const points = Array.from({ length: random.int(1, 5) }, () =>
				random.array(n, 0, 10),
			);
			expect(maxPoints(points)).toBe(byBruteForce(points));
		}
	});
});
