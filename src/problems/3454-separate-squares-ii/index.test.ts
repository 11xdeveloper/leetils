import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { separateSquaresII as separateSquares } from ".";

/** Splits the plane into unit cells and finds the half line by bisection. */
const byBruteForce = (squares: number[][]): number => {
	const cells = new Set<string>();
	for (const [x = 0, y = 0, l = 0] of squares)
		for (let i = x; i < x + l; i++)
			for (let j = y; j < y + l; j++) cells.add(`${i},${j}`);
	const ys = [...cells].map((c) => Number(c.split(",")[1]));
	const total = cells.size;
	const below = (line: number) =>
		ys.reduce((a, y) => a + Math.min(1, Math.max(0, line - y)), 0);
	let lo = Math.min(...ys);
	let hi = Math.max(...ys) + 1;
	for (let step = 0; step < 60; step++) {
		const mid = (lo + hi) / 2;
		if (2 * below(mid) >= total) hi = mid;
		else lo = mid;
	}
	return hi;
};

describe("3454. Separate Squares II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			separateSquares([
				[0, 0, 1],
				[2, 2, 1],
			]),
		).toBeCloseTo(1, 5);
		expect(
			separateSquares([
				[0, 0, 2],
				[1, 1, 1],
			]),
		).toBeCloseTo(1, 5);
	});

	it("matches counting unit cells on random squares", () => {
		const random = createRandom(3454);
		for (let run = 0; run < 200; run++) {
			const squares = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, 6),
				random.int(0, 6),
				random.int(1, 4),
			]);
			expect(separateSquares(squares)).toBeCloseTo(byBruteForce(squares), 5);
		}
	});
});
