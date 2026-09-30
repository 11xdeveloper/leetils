import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { cherryPickupII as cherryPickup } from ".";

/** Tries every pair of paths. */
const byBruteForce = (grid: number[][]): number => {
	const cols = grid[0]?.length ?? 0;
	const walk = (r: number, a: number, b: number): number => {
		const row = grid[r];
		if (!row) return 0;
		const here = (row[a] ?? 0) + (a === b ? 0 : (row[b] ?? 0));
		let best = r === grid.length - 1 ? 0 : -Infinity;
		for (const da of [-1, 0, 1]) {
			for (const db of [-1, 0, 1]) {
				const [a2, b2] = [a + da, b + db];
				if (
					r + 1 < grid.length &&
					a2 >= 0 &&
					a2 < cols &&
					b2 >= 0 &&
					b2 < cols
				) {
					best = Math.max(best, walk(r + 1, a2, b2));
				}
			}
		}
		return here + best;
	};
	return walk(0, 0, cols - 1);
};

describe("1463. Cherry Pickup II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			cherryPickup([
				[3, 1, 1],
				[2, 5, 1],
				[1, 5, 5],
				[2, 1, 1],
			]),
		).toBe(24);
		expect(
			cherryPickup([
				[1, 0, 0, 0, 0, 0, 1],
				[2, 0, 0, 0, 0, 3, 0],
				[2, 0, 9, 0, 0, 0, 0],
				[0, 3, 0, 5, 4, 0, 0],
				[1, 0, 2, 3, 0, 0, 6],
			]),
		).toBe(28);
	});

	it("matches trying every pair of paths on random grids", () => {
		const random = createRandom(1463);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(2, 5), random.int(2, 4)];
			const grid = Array.from({ length: rows }, () => random.array(cols, 0, 9));
			expect(cherryPickup(grid)).toBe(byBruteForce(grid));
		}
	});
});
