import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumTimeToVisitACellInAGrid as minimumTime } from ".";

/** Breadth-first search over (cell, time) up to a time limit. */
const byBruteForce = (grid: number[][]): number => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	let frontier = new Set([0]);
	for (let time = 0; time <= 60; time++) {
		if (frontier.has(rows * cols - 1)) return time;
		const next = new Set<number>();
		for (const cell of frontier) {
			const r = Math.floor(cell / cols);
			const c = cell % cols;
			for (const [nr, nc] of [
				[r - 1, c],
				[r + 1, c],
				[r, c - 1],
				[r, c + 1],
			] as const) {
				const opens = grid[nr]?.[nc];
				if (opens !== undefined && opens <= time + 1) next.add(nr * cols + nc);
			}
		}
		frontier = next;
	}
	return -1;
};

describe("2577. Minimum Time to Visit a Cell In a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumTime([
				[0, 1, 3, 2],
				[5, 1, 2, 5],
				[4, 3, 8, 6],
			]),
		).toBe(7);
		expect(
			minimumTime([
				[0, 2, 4],
				[3, 2, 1],
				[1, 0, 4],
			]),
		).toBe(-1);
	});

	it("matches a search over cells and times on random grids", () => {
		const random = createRandom(2577);
		for (let run = 0; run < 200; run++) {
			const rows = random.int(2, 4);
			const cols = random.int(2, 4);
			const grid = Array.from({ length: rows }, () =>
				random.array(cols, 0, 12),
			);
			(grid[0] ?? [])[0] = 0;
			expect(minimumTime(grid)).toBe(byBruteForce(grid));
		}
	});
});
