import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lengthOfTheLongestIncreasingPath as maxPathLength } from ".";

/** Longest chain through k by quadratic dynamic programming. */
const byBruteForce = (points: number[][], k: number): number => {
	const order = points
		.map((_, i) => i)
		.sort((a, b) => (points[a]?.[0] ?? 0) - (points[b]?.[0] ?? 0));
	const below = (a: number, b: number) =>
		(points[a]?.[0] ?? 0) < (points[b]?.[0] ?? 0) &&
		(points[a]?.[1] ?? 0) < (points[b]?.[1] ?? 0);
	const ending = new Map<number, number>();
	for (const i of order) {
		let best = 1;
		for (const [j, length] of ending)
			if (below(j, i)) best = Math.max(best, length + 1);
		ending.set(i, best);
	}
	const starting = new Map<number, number>();
	for (const i of order.toReversed()) {
		let best = 1;
		for (const [j, length] of starting)
			if (below(i, j)) best = Math.max(best, length + 1);
		starting.set(i, best);
	}
	return (ending.get(k) ?? 1) + (starting.get(k) ?? 1) - 1;
};

describe("3288. Length of the Longest Increasing Path", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxPathLength(
				[
					[3, 1],
					[2, 2],
					[4, 1],
					[0, 0],
					[5, 3],
				],
				1,
			),
		).toBe(3);
		expect(
			maxPathLength(
				[
					[2, 1],
					[7, 0],
					[5, 6],
				],
				2,
			),
		).toBe(2);
	});

	it("matches quadratic dynamic programming on random points", () => {
		const random = createRandom(3288);
		for (let run = 0; run < 300; run++) {
			const unique = new Map<string, number[]>();
			for (let i = random.int(1, 12); i > 0; i--) {
				const p = [random.int(0, 8), random.int(0, 8)];
				unique.set(p.join(), p);
			}
			const points = [...unique.values()];
			const k = random.int(0, points.length - 1);
			expect(maxPathLength(points, k)).toBe(byBruteForce(points, k));
		}
	});
});
