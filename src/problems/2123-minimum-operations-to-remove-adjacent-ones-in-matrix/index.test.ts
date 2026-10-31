import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumOperationsToRemoveAdjacentOnesInMatrix as minimumOperations } from ".";

/** Tries every set of 1s to clear. */
const byBruteForce = (grid: number[][]): number => {
	const cols = grid[0]?.length ?? 0;
	const ones = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell ? [r * cols + c] : [])),
	);
	let best = Infinity;
	for (let mask = 0; mask < 1 << ones.length; mask++) {
		const kept = new Set(ones.filter((_, i) => !(mask & (1 << i))));
		const isolated = [...kept].every(
			(cell) =>
				!(cell % cols < cols - 1 && kept.has(cell + 1)) &&
				!kept.has(cell + cols),
		);
		if (isolated) best = Math.min(best, ones.length - kept.size);
	}
	return best;
};

describe("2123. Minimum Operations to Remove Adjacent Ones in Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumOperations([
				[1, 1, 0],
				[0, 1, 1],
				[1, 1, 1],
			]),
		).toBe(3);
		expect(
			minimumOperations([
				[0, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(0);
		expect(
			minimumOperations([
				[0, 1],
				[1, 0],
			]),
		).toBe(0);
	});

	it("matches trying every set of cells on random grids", () => {
		const random = createRandom(2123);
		for (let run = 0; run < 200; run++) {
			const cols = random.int(1, 4);
			const grid = Array.from({ length: random.int(1, 4) }, () =>
				random.array(cols, 0, 1),
			);
			expect(minimumOperations(grid)).toBe(byBruteForce(grid));
		}
	});
});
