import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPathInAHiddenGrid as findShortestPath } from ".";

const STEPS: Record<string, [number, number]> = {
	U: [-1, 0],
	D: [1, 0],
	L: [0, -1],
	R: [0, 1],
};

/** A GridMaster over LeetCode's test grid: -1 start, 0 blocked, 1 empty, 2 target. */
const gridMaster = (grid: number[][]) => {
	let [row, col] = [0, 0];
	for (const [r, line] of grid.entries())
		for (const [c, cell] of line.entries())
			if (cell === -1) [row, col] = [r, c];
	const open = (r: number, c: number) => (grid[r]?.[c] ?? 0) !== 0;
	return {
		canMove: (direction: string) => {
			const [dr, dc] = STEPS[direction] ?? [0, 0];
			return open(row + dr, col + dc);
		},
		move: (direction: string) => {
			const [dr, dc] = STEPS[direction] ?? [0, 0];
			if (open(row + dr, col + dc)) [row, col] = [row + dr, col + dc];
		},
		isTarget: () => grid[row]?.[col] === 2,
	};
};

/** Breadth-first search with the grid in view. */
const byBruteForce = (grid: number[][]): number => {
	const starts = grid.flatMap((line, r) =>
		line.flatMap((cell, c) => (cell === -1 ? [[r, c]] : [])),
	);
	const dist = new Map(starts.map(([r, c]) => [`${r},${c}`, 0]));
	const queue = [...starts];
	for (let head = 0; head < queue.length; head++) {
		const [r = 0, c = 0] = queue[head] ?? [];
		const d = dist.get(`${r},${c}`) ?? 0;
		if (grid[r]?.[c] === 2) return d;
		for (const [dr, dc] of Object.values(STEPS)) {
			const [nr, nc] = [r + dr, c + dc];
			if ((grid[nr]?.[nc] ?? 0) === 0 || dist.has(`${nr},${nc}`)) continue;
			dist.set(`${nr},${nc}`, d + 1);
			queue.push([nr, nc]);
		}
	}
	return -1;
};

describe("1778. Shortest Path in a Hidden Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findShortestPath(
				gridMaster([
					[1, 2],
					[-1, 0],
				]),
			),
		).toBe(2);
		expect(
			findShortestPath(
				gridMaster([
					[0, 0, -1],
					[1, 1, 1],
					[2, 0, 0],
				]),
			),
		).toBe(4);
		expect(
			findShortestPath(
				gridMaster([
					[-1, 0],
					[0, 2],
				]),
			),
		).toBe(-1);
	});

	it("matches a breadth-first search with the grid in view on random grids", () => {
		const random = createRandom(1778);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(1, 6), random.int(2, 6)];
			const grid = Array.from({ length: rows }, () =>
				random.array(cols, 0, 2).map((v): number => (v === 2 ? 1 : v)),
			);
			const cells = Array.from({ length: rows * cols }, (_, i) => i);
			const start = cells.splice(random.int(0, cells.length - 1), 1)[0] ?? 0;
			const target = cells[random.int(0, cells.length - 1)] ?? 0;
			const startRow = grid[Math.floor(start / cols)];
			const targetRow = grid[Math.floor(target / cols)];
			if (startRow) startRow[start % cols] = -1;
			if (targetRow) targetRow[target % cols] = 2;
			expect(findShortestPath(gridMaster(grid))).toBe(byBruteForce(grid));
		}
	});
});
