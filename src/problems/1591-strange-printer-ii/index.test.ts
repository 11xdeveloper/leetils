import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { strangePrinterII as isPrintable } from ".";

/**
 * Peels colours off in reverse: a colour can be the last printed if its
 * bounding rectangle holds only itself or cells already peeled.
 */
const byBruteForce = (grid: number[][]): boolean => {
	const cells = grid.map((row) => [...row] as (number | undefined)[]);
	const colours = new Set(grid.flat());
	for (let progress = true; progress && colours.size > 0; ) {
		progress = false;
		for (const colour of colours) {
			const spots = cells.flatMap((row, r) =>
				row.flatMap((v, c) => (v === colour ? [[r, c]] : [])),
			);
			const rows = spots.map(([r = 0]) => r);
			const cols = spots.map(([, c = 0]) => c);
			let clear = true;
			for (let r = Math.min(...rows); r <= Math.max(...rows); r++) {
				for (let c = Math.min(...cols); c <= Math.max(...cols); c++) {
					const v = cells[r]?.[c];
					if (v !== undefined && v !== colour) clear = false;
				}
			}
			if (!clear) continue;
			for (const [r = 0, c = 0] of spots) {
				const row = cells[r];
				if (row) row[c] = undefined;
			}
			colours.delete(colour);
			progress = true;
		}
	}
	return colours.size === 0;
};

describe("1591. Strange Printer II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			isPrintable([
				[1, 1, 1, 1],
				[1, 2, 2, 1],
				[1, 2, 2, 1],
				[1, 1, 1, 1],
			]),
		).toBeTrue();
		expect(
			isPrintable([
				[1, 1, 1, 1],
				[1, 1, 3, 3],
				[1, 1, 3, 4],
				[5, 5, 1, 4],
			]),
		).toBeTrue();
		expect(
			isPrintable([
				[1, 2, 1],
				[2, 1, 2],
				[1, 2, 1],
			]),
		).toBeFalse();
	});

	it("matches peeling colours off on random grids", () => {
		const random = createRandom(1591);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			let grid: number[][];
			if (random.next() < 0.5) {
				grid = Array.from({ length: m }, () => random.array(n, 1, 3));
			} else {
				// Actually print some rectangles so true cases are common.
				grid = Array.from({ length: m }, () => new Array<number>(n).fill(1));
				for (let colour = 2; colour <= random.int(2, 4); colour++) {
					const [r1, r2] = [random.int(0, m - 1), random.int(0, m - 1)].sort(
						(a, b) => a - b,
					);
					const [c1, c2] = [random.int(0, n - 1), random.int(0, n - 1)].sort(
						(a, b) => a - b,
					);
					for (let r = r1 ?? 0; r <= (r2 ?? 0); r++) {
						for (let c = c1 ?? 0; c <= (c2 ?? 0); c++) {
							const row = grid[r];
							if (row) row[c] = colour;
						}
					}
				}
			}
			expect(isPrintable(grid)).toBe(byBruteForce(grid));
		}
	});
});
