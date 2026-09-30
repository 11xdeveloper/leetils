import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { regionsCutBySlashes } from ".";

/** Draws each cell at 3 × 3 resolution and counts the open regions by flood fill. */
const byPixels = (grid: string[]): number => {
	const n = grid.length;
	const size = 3 * n;
	const wall = Array.from({ length: size }, () =>
		new Array<boolean>(size).fill(false),
	);
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++) {
			for (let k = 0; k < 3; k++) {
				if (grid[r]?.charAt(c) === "/")
					(wall[3 * r + k] ?? [])[3 * c + 2 - k] = true;
				if (grid[r]?.charAt(c) === "\\")
					(wall[3 * r + k] ?? [])[3 * c + k] = true;
			}
		}
	}
	let regions = 0;
	for (let r = 0; r < size; r++) {
		for (let c = 0; c < size; c++) {
			if (wall[r]?.[c]) continue;
			regions++;
			const stack = [[r, c]];
			(wall[r] ?? [])[c] = true;
			for (let cell = stack.pop(); cell; cell = stack.pop()) {
				const [cr = 0, cc = 0] = cell;
				for (const [dr, dc] of [
					[1, 0],
					[-1, 0],
					[0, 1],
					[0, -1],
				] as const) {
					const row = wall[cr + dr];
					if (!row || row[cc + dc] !== false) continue;
					row[cc + dc] = true;
					stack.push([cr + dr, cc + dc]);
				}
			}
		}
	}
	return regions;
};

describe("959. Regions Cut By Slashes", () => {
	it("solves the examples from the problem statement", () => {
		expect(regionsCutBySlashes([" /", "/ "])).toBe(2);
		expect(regionsCutBySlashes([" /", "  "])).toBe(1);
		expect(regionsCutBySlashes(["/\\", "\\/"])).toBe(5);
	});

	it("matches flood filling a pixel drawing on random grids", () => {
		const random = createRandom(959);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 5);
			const grid = Array.from({ length: n }, () => random.string(n, " /\\"));
			expect(regionsCutBySlashes(grid)).toBe(byPixels(grid));
		}
	});
});
