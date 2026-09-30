import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maxValueOfEquation as findMaxValueOfEquation } from ".";

/** Checks every pair. */
const byBruteForce = (points: number[][], k: number): number => {
	let best = -Infinity;
	for (let i = 0; i < points.length; i++) {
		for (let j = i + 1; j < points.length; j++) {
			const [xi = 0, yi = 0] = points[i] ?? [];
			const [xj = 0, yj = 0] = points[j] ?? [];
			if (xj - xi <= k) best = Math.max(best, yi + yj + xj - xi);
		}
	}
	return best;
};

describe("1499. Max Value of Equation", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findMaxValueOfEquation(
				[
					[1, 3],
					[2, 0],
					[5, 10],
					[6, -10],
				],
				1,
			),
		).toBe(4);
		expect(
			findMaxValueOfEquation(
				[
					[0, 0],
					[3, 0],
					[9, 2],
				],
				3,
			),
		).toBe(3);
	});

	it("matches checking every pair on random inputs", () => {
		const random = createRandom(1499);
		for (let run = 0; run < 300; run++) {
			const xs = [...new Set(random.array(random.int(2, 10), 0, 20))].sort(
				(a, b) => a - b,
			);
			if (xs.length < 2) continue;
			const points = xs.map((x) => [x, random.int(-10, 10)]);
			const k = random.int(0, 10);
			const expected = byBruteForce(points, k);
			if (expected === -Infinity) continue;
			expect(findMaxValueOfEquation(points, k)).toBe(expected);
		}
	});
});
