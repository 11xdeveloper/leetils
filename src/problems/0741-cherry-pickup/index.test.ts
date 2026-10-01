import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cherryPickup } from ".";

/** Every right-or-down path from the top-left to the bottom-right, as lists of cells. */
const paths = (grid: number[][]): number[][][] => {
	const n = grid.length;
	const result: number[][][] = [];
	const walk = (r: number, c: number, path: number[][]): void => {
		if (r >= n || c >= n || grid[r]?.[c] === -1) return;
		const next = [...path, [r, c]];
		if (r === n - 1 && c === n - 1) result.push(next);
		walk(r + 1, c, next);
		walk(r, c + 1, next);
	};
	walk(0, 0, []);
	return result;
};

/** Tries every pair of paths there and back. */
const byBruteForce = (grid: number[][]): number => {
	const all = paths(grid);
	let best = 0;
	for (const a of all) {
		for (const b of all) {
			const cells = new Set([...a, ...b].map(String));
			let cherries = 0;
			for (const cell of cells) {
				const [r = 0, c = 0] = cell.split(",").map(Number);
				cherries += grid[r]?.[c] ?? 0;
			}
			best = Math.max(best, cherries);
		}
	}
	return best;
};

describe("741. Cherry Pickup", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cherryPickup([
				[0, 1, -1],
				[1, 0, -1],
				[1, 1, 1],
			]),
		).toBe(5);
		expect(
			cherryPickup([
				[1, 1, -1],
				[1, -1, 1],
				[-1, 1, 1],
			]),
		).toBe(0);
	});

	it("matches trying every pair of paths on random grids", () => {
		const random = createRandom(741);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 4);
			const grid = Array.from({ length: n }, () => random.array(n, -1, 1));
			const first = grid[0];
			if (first) first[0] = random.int(0, 1);
			const last = grid[n - 1];
			if (last) last[n - 1] = random.int(0, 1);
			expect(cherryPickup(grid)).toBe(byBruteForce(grid));
		}
	});
});
