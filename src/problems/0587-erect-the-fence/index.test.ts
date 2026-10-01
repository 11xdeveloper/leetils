import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { erectTheFence as outerTrees } from ".";

const keys = (points: number[][]): string[] =>
	points.map((point) => point.join()).sort();

/** A point is on the hull if some line through it and another point has every point on one side. */
const byBruteForce = (points: number[][]): number[][] =>
	points.filter(
		(p) =>
			points.length === 1 ||
			points.some((q) => {
				if (q === p) return false;
				const sides = points.map(
					(r) =>
						((q[0] ?? 0) - (p[0] ?? 0)) * ((r[1] ?? 0) - (p[1] ?? 0)) -
						((q[1] ?? 0) - (p[1] ?? 0)) * ((r[0] ?? 0) - (p[0] ?? 0)),
				);
				return (
					sides.every((side) => side >= 0) || sides.every((side) => side <= 0)
				);
			}),
	);

describe("587. Erect the Fence", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			keys(
				outerTrees([
					[1, 1],
					[2, 2],
					[2, 0],
					[2, 4],
					[3, 3],
					[4, 2],
				]),
			),
		).toEqual(
			keys([
				[1, 1],
				[2, 0],
				[4, 2],
				[3, 3],
				[2, 4],
			]),
		);
		expect(
			keys(
				outerTrees([
					[1, 2],
					[2, 2],
					[4, 2],
				]),
			),
		).toEqual(
			keys([
				[4, 2],
				[2, 2],
				[1, 2],
			]),
		);
	});

	it("keeps every point when they're all on one line", () => {
		const line = Array.from({ length: 8 }, (_, i) => [i, 2 * i]);
		expect(keys(outerTrees(line))).toEqual(keys(line));
	});

	it("matches checking supporting lines on random points", () => {
		const random = createRandom(587);
		for (let run = 0; run < 1000; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 12); i > 0; i--) {
				const point = [random.int(0, 5), random.int(0, 5)];
				unique.set(point.join(), point);
			}
			const points = [...unique.values()];
			expect(keys(outerTrees(points))).toEqual(keys(byBruteForce(points)));
		}
	});
});
