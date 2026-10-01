import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bombEnemy } from ".";

const parse = (rows: string[]): string[][] => rows.map((row) => row.split(""));

/** Places the bomb on every empty cell and walks out in four directions. */
const byBruteForce = (grid: string[][]): number => {
	let best = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== "0") continue;
			let kills = 0;
			for (const [dr, dc] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			] as const) {
				for (
					let [nr, nc] = [r + dr, c + dc];
					grid[nr]?.[nc] !== undefined && grid[nr]?.[nc] !== "W";
					nr += dr, nc += dc
				) {
					if (grid[nr]?.[nc] === "E") kills++;
				}
			}
			best = Math.max(best, kills);
		}
	}
	return best;
};

describe("361. Bomb Enemy", () => {
	it("solves the examples from the problem statement", () => {
		expect(bombEnemy(parse(["0E00", "E0WE", "0E00"]))).toBe(3);
		expect(bombEnemy(parse(["WWW", "000", "EEE"]))).toBe(1);
	});

	it("returns 0 with no empty cell", () => {
		expect(bombEnemy(parse(["EW", "WE"]))).toBe(0);
	});

	it("matches trying every cell on random grids", () => {
		const random = createRandom(361);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.string(columns, "00EW").split(""),
			);
			expect(bombEnemy(grid)).toBe(byBruteForce(grid));
		}
	});
});
