import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumPathCostInAHiddenGrid as findShortestPath } from ".";

const STEPS: Record<string, [number, number]> = {
	U: [-1, 0],
	D: [1, 0],
	L: [0, -1],
	R: [0, 1],
};

/** A GridMaster over LeetCode's test input: 0 is blocked, otherwise the cost to enter. */
const gridMaster = (
	grid: number[][],
	r1: number,
	c1: number,
	r2: number,
	c2: number,
) => {
	let [row, col] = [r1, c1];
	const open = (r: number, c: number) => (grid[r]?.[c] ?? 0) > 0;
	return {
		canMove: (direction: string) => {
			const [dr, dc] = STEPS[direction] ?? [0, 0];
			return open(row + dr, col + dc);
		},
		move: (direction: string) => {
			const [dr, dc] = STEPS[direction] ?? [0, 0];
			if (!open(row + dr, col + dc)) return -1;
			[row, col] = [row + dr, col + dc];
			return grid[row]?.[col] ?? -1;
		},
		isTarget: () => row === r2 && col === c2,
	};
};

/** Bellman–Ford style relaxation with the grid in view. */
const byBruteForce = (
	grid: number[][],
	r1: number,
	c1: number,
	r2: number,
	c2: number,
): number => {
	const best = grid.map((line) => line.map(() => Infinity));
	const startRow = best[r1];
	if (startRow) startRow[c1] = 0;
	for (let changed = true; changed; ) {
		changed = false;
		for (const [r, line] of grid.entries()) {
			for (const [c, value] of line.entries()) {
				if (value === 0) continue;
				for (const [dr, dc] of Object.values(STEPS)) {
					const from = best[r + dr]?.[c + dc] ?? Infinity;
					const row = best[r];
					if (
						row &&
						from + value < (row[c] ?? Infinity) &&
						!(r === r1 && c === c1)
					) {
						row[c] = from + value;
						changed = true;
					}
				}
			}
		}
	}
	const answer = best[r2]?.[c2] ?? Infinity;
	return answer === Infinity ? -1 : answer;
};

describe("1810. Minimum Path Cost in a Hidden Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			findShortestPath(
				gridMaster(
					[
						[2, 3],
						[1, 1],
					],
					0,
					1,
					1,
					0,
				),
			),
		).toBe(2);
		expect(
			findShortestPath(
				gridMaster(
					[
						[0, 3, 1],
						[3, 4, 2],
						[1, 2, 0],
					],
					2,
					0,
					0,
					2,
				),
			),
		).toBe(9);
		expect(
			findShortestPath(
				gridMaster(
					[
						[1, 0],
						[0, 1],
					],
					0,
					0,
					1,
					1,
				),
			),
		).toBe(-1);
	});

	it("matches relaxing costs with the grid in view on random grids", () => {
		const random = createRandom(1810);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(1, 6), random.int(2, 6)];
			const grid = Array.from({ length: rows }, () =>
				random
					.array(cols, 0, 5)
					.map((v): number => (v === 0 && random.int(0, 1) ? 1 : v)),
			);
			const cells = Array.from({ length: rows * cols }, (_, i) => i);
			const start = cells.splice(random.int(0, cells.length - 1), 1)[0] ?? 0;
			const target = cells[random.int(0, cells.length - 1)] ?? 0;
			const [r1, c1, r2, c2] = [
				Math.floor(start / cols),
				start % cols,
				Math.floor(target / cols),
				target % cols,
			];
			for (const [r, c] of [
				[r1, c1],
				[r2, c2],
			] as const) {
				const line = grid[r];
				if (line && line[c] === 0) line[c] = random.int(1, 5);
			}
			expect(findShortestPath(gridMaster(grid, r1, c1, r2, c2))).toBe(
				byBruteForce(grid, r1, c1, r2, c2),
			);
		}
	});
});
