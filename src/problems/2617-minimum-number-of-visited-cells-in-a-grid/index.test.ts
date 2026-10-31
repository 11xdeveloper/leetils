import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfVisitedCellsInAGrid as minimumVisitedCells } from ".";

/** Breadth-first search trying every jump. */
const byBruteForce = (grid: number[][]): number => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const cells = grid.map((row) => row.map(() => -1));
	(cells[0] ?? [])[0] = 1;
	const queue: [number, number][] = [[0, 0]];
	for (let head = 0; head < queue.length; head++) {
		const [r, c] = queue[head] ?? [0, 0];
		const reach = grid[r]?.[c] ?? 0;
		for (let step = 1; step <= reach; step++)
			for (const [nr, nc] of [
				[r, c + step],
				[r + step, c],
			] as const)
				if (nr < rows && nc < cols && cells[nr]?.[nc] === -1) {
					(cells[nr] ?? [])[nc] = (cells[r]?.[c] ?? 0) + 1;
					queue.push([nr, nc]);
				}
	}
	return cells[rows - 1]?.[cols - 1] ?? -1;
};

describe("2617. Minimum Number of Visited Cells in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumVisitedCells([
				[3, 4, 2, 1],
				[4, 2, 3, 1],
				[2, 1, 0, 0],
				[2, 4, 0, 0],
			]),
		).toBe(4);
		expect(
			minimumVisitedCells([
				[3, 4, 2, 1],
				[4, 2, 1, 1],
				[2, 1, 1, 0],
				[3, 4, 1, 0],
			]),
		).toBe(3);
		expect(
			minimumVisitedCells([
				[2, 1, 0],
				[1, 0, 0],
			]),
		).toBe(-1);
	});

	it("matches trying every jump on random grids", () => {
		const random = createRandom(2617);
		for (let run = 0; run < 300; run++) {
			const cols = random.int(1, 6);
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				random.array(cols, 0, 3),
			);
			expect(minimumVisitedCells(grid)).toBe(byBruteForce(grid));
		}
	});
});
