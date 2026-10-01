import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { numberOfEnclaves as numEnclaves } from ".";

/** Searches from each land cell for a way off the grid. */
const byBruteForce = (grid: number[][]): number => {
	let enclosed = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 1) continue;
			const seen = new Set([`${r},${c}`]);
			const queue = [[r, c]];
			let escaped = false;
			for (const [qr = 0, qc = 0] of queue) {
				for (const [dr, dc] of [
					[1, 0],
					[-1, 0],
					[0, 1],
					[0, -1],
				] as const) {
					const value = grid[qr + dr]?.[qc + dc];
					if (value === undefined) escaped = true;
					else if (value === 1 && !seen.has(`${qr + dr},${qc + dc}`)) {
						seen.add(`${qr + dr},${qc + dc}`);
						queue.push([qr + dr, qc + dc]);
					}
				}
			}
			if (!escaped) enclosed++;
		}
	}
	return enclosed;
};

describe("1020. Number of Enclaves", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			numEnclaves([
				[0, 0, 0, 0],
				[1, 0, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0],
			]),
		).toBe(3);
		expect(
			numEnclaves([
				[0, 1, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 1, 0],
				[0, 0, 0, 0],
			]),
		).toBe(0);
	});

	it("matches searching from each land cell on random grids", () => {
		const random = createRandom(1020);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(cols, 0, 1),
			);
			expect(numEnclaves(grid)).toBe(byBruteForce(grid));
		}
	});
});
