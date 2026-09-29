import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { outOfBoundaryPaths as findPaths } from ".";

/** Follows every path, without memoisation. */
const byBruteForce = (
	m: number,
	n: number,
	moves: number,
	row: number,
	col: number,
): number => {
	if (row < 0 || row >= m || col < 0 || col >= n) return 1;
	if (moves === 0) return 0;
	return [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	].reduce(
		(total, [dr = 0, dc = 0]) =>
			total + byBruteForce(m, n, moves - 1, row + dr, col + dc),
		0,
	);
};

describe("576. Out of Boundary Paths", () => {
	it("solves the examples from the problem statement", () => {
		expect(findPaths(2, 2, 2, 0, 0)).toBe(6);
		expect(findPaths(1, 3, 3, 0, 1)).toBe(12);
	});

	it("handles no moves and the largest inputs", () => {
		expect(findPaths(1, 1, 0, 0, 0)).toBe(0);
		expect(findPaths(8, 50, 23, 5, 26)).toBe(914783380);
	});

	it("matches following every path on random inputs", () => {
		const random = createRandom(576);
		for (let run = 0; run < 200; run++) {
			const m = random.int(1, 4);
			const n = random.int(1, 4);
			const moves = random.int(0, 6);
			const row = random.int(0, m - 1);
			const col = random.int(0, n - 1);
			expect(findPaths(m, n, moves, row, col)).toBe(
				byBruteForce(m, n, moves, row, col),
			);
		}
	});
});
