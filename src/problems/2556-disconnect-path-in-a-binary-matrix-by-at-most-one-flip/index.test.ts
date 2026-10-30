import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { disconnectPathInABinaryMatrixByAtMostOneFlip as isPossibleToCutPath } from ".";

/** Tries flipping each inner cell and searching for a path. */
const byBruteForce = (grid: number[][]): boolean => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	const connected = (g: number[][]): boolean => {
		const reach = g.map((row) => row.map(() => false));
		for (let r = 0; r < rows; r++)
			for (let c = 0; c < cols; c++)
				(reach[r] ?? [])[c] =
					g[r]?.[c] === 1 &&
					((r === 0 && c === 0) || !!reach[r - 1]?.[c] || !!reach[r]?.[c - 1]);
		return !!reach[rows - 1]?.[cols - 1];
	};
	if (!connected(grid)) return true;
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++) {
			if ((r === 0 && c === 0) || (r === rows - 1 && c === cols - 1)) continue;
			const flipped = grid.map((row) => [...row]);
			(flipped[r] ?? [])[c] = 1 - (flipped[r]?.[c] ?? 0);
			if (!connected(flipped)) return true;
		}
	return false;
};

describe("2556. Disconnect Path in a Binary Matrix by at Most One Flip", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPossibleToCutPath([
				[1, 1, 1],
				[1, 0, 0],
				[1, 1, 1],
			]),
		).toBe(true);
		expect(
			isPossibleToCutPath([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toBe(false);
	});

	it("matches trying every flip on random grids", () => {
		const random = createRandom(2556);
		for (let run = 0; run < 300; run++) {
			const rows = random.int(1, 5);
			const cols = random.int(rows === 1 ? 2 : 1, 5);
			const grid = Array.from({ length: rows }, () =>
				Array.from({ length: cols }, () => (random.int(0, 3) ? 1 : 0)),
			);
			(grid[0] ?? [])[0] = 1;
			(grid[rows - 1] ?? [])[cols - 1] = 1;
			expect(isPossibleToCutPath(grid)).toBe(byBruteForce(grid));
		}
	});
});
