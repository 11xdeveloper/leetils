import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { largest1BorderedSquare } from ".";

/** Checks the border of every square directly. */
const byBruteForce = (grid: number[][]): number => {
	let best = 0;
	for (let r = 0; r < grid.length; r++) {
		for (let c = 0; c < (grid[0]?.length ?? 0); c++) {
			for (
				let side = 1;
				grid[r + side - 1]?.[c + side - 1] !== undefined;
				side++
			) {
				let bordered = true;
				for (let i = 0; i < side; i++) {
					for (const [dr, dc] of [
						[0, i],
						[side - 1, i],
						[i, 0],
						[i, side - 1],
					] as const) {
						if (grid[r + dr]?.[c + dc] !== 1) bordered = false;
					}
				}
				if (bordered) best = Math.max(best, side * side);
			}
		}
	}
	return best;
};

describe("1139. Largest 1-Bordered Square", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			largest1BorderedSquare([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toBe(9);
		expect(largest1BorderedSquare([[1, 1, 0, 0]])).toBe(1);
	});

	it("returns 0 for a grid of 0s", () => {
		expect(
			largest1BorderedSquare([
				[0, 0],
				[0, 0],
			]),
		).toBe(0);
	});

	it("matches checking every square on random grids", () => {
		const random = createRandom(1139);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 7), random.int(1, 7)];
			const density = random.next() * 0.5 + 0.5;
			const grid = Array.from({ length: m }, () =>
				Array.from({ length: n }, () => (random.next() < density ? 1 : 0)),
			);
			expect(largest1BorderedSquare(grid)).toBe(byBruteForce(grid));
		}
	});
});
