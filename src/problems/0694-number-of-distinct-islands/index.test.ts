import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfDistinctIslands } from ".";

/** Finds islands with union-by-labels, then normalises each by its smallest row and column. */
const byNormalising = (grid: number[][]): number => {
	const label = grid.map((row) => row.map(() => -1));
	const islands: number[][][] = [];
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1 || (label[r]?.[c] ?? -1) >= 0) continue;
			const island: number[][] = [];
			const queue = [[r, c]];
			(label[r] ?? [])[c] = islands.length;
			for (const [qr = 0, qc = 0] of queue) {
				island.push([qr, qc]);
				for (const [dr, dc] of [
					[1, 0],
					[-1, 0],
					[0, 1],
					[0, -1],
				] as const) {
					if (
						grid[qr + dr]?.[qc + dc] === 1 &&
						label[qr + dr]?.[qc + dc] === -1
					) {
						(label[qr + dr] ?? [])[qc + dc] = islands.length;
						queue.push([qr + dr, qc + dc]);
					}
				}
			}
			islands.push(island);
		}
	}
	const shapes = islands.map((island) => {
		const minRow = Math.min(...island.map(([r = 0]) => r));
		const minCol = Math.min(...island.map(([, c = 0]) => c));
		return island
			.map(([r = 0, c = 0]) => `${r - minRow}:${c - minCol}`)
			.sort()
			.join();
	});
	return new Set(shapes).size;
};

describe("694. Number of Distinct Islands", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numberOfDistinctIslands([
				[1, 1, 0, 0, 0],
				[1, 1, 0, 0, 0],
				[0, 0, 0, 1, 1],
				[0, 0, 0, 1, 1],
			]),
		).toBe(1);
		expect(
			numberOfDistinctIslands([
				[1, 1, 0, 1, 1],
				[1, 0, 0, 0, 0],
				[0, 0, 0, 0, 1],
				[1, 1, 0, 1, 1],
			]),
		).toBe(3);
	});

	it("treats reflections as different shapes", () => {
		expect(
			numberOfDistinctIslands([
				[1, 1, 0, 1, 1],
				[0, 1, 0, 1, 0],
			]),
		).toBe(2);
	});

	it("matches normalising each island on random grids", () => {
		const random = createRandom(694);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			expect(numberOfDistinctIslands(grid)).toBe(byNormalising(grid));
		}
	});
});
