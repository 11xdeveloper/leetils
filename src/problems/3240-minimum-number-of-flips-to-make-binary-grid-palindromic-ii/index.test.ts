import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfFlipsToMakeBinaryGridPalindromicII as minFlips } from ".";

/** Tries every grid of the same size. */
const byBruteForce = (grid: number[][]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const flat = grid.flat();
	let best = Number.POSITIVE_INFINITY;
	for (let mask = 0; mask < 1 << (m * n); mask++) {
		const cell = (r: number, c: number) => (mask >> (r * n + c)) & 1;
		let ok = true;
		let ones = 0;
		for (let r = 0; r < m; r++)
			for (let c = 0; c < n; c++) {
				ones += cell(r, c);
				if (
					cell(r, c) !== cell(r, n - 1 - c) ||
					cell(r, c) !== cell(m - 1 - r, c)
				)
					ok = false;
			}
		if (!ok || ones % 4 !== 0) continue;
		let flips = 0;
		flat.forEach((v, i) => {
			if (v !== ((mask >> i) & 1)) flips++;
		});
		best = Math.min(best, flips);
	}
	return best;
};

describe("3240. Minimum Number of Flips to Make Binary Grid Palindromic II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minFlips([
				[1, 0, 0],
				[0, 1, 0],
				[0, 0, 1],
			]),
		).toBe(3);
		expect(
			minFlips([
				[0, 1],
				[0, 1],
				[0, 0],
			]),
		).toBe(2);
		expect(minFlips([[1], [1]])).toBe(2);
	});

	it("matches trying every grid on small random grids", () => {
		const random = createRandom(3240);
		for (let run = 0; run < 100; run++) {
			const m = random.int(1, 4);
			const n = random.int(1, Math.floor(16 / m));
			const grid = Array.from({ length: m }, () => random.array(n, 0, 1));
			expect(minFlips(grid)).toBe(byBruteForce(grid));
		}
	});
});
