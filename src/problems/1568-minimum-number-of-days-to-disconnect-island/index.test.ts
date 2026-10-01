import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumNumberOfDaysToDisconnectIsland as minDays } from ".";

/** Tries removing every set of up to two land cells, counting islands each time. */
const byBruteForce = (grid: number[][]): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const land = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell === 1 ? [[r, c]] : [])),
	);
	const islands = (removed: Set<string>) => {
		const seen = new Set<string>();
		let count = 0;
		const sink = (r: number, c: number): void => {
			const key = `${r},${c}`;
			if (
				r < 0 ||
				r >= m ||
				c < 0 ||
				c >= n ||
				grid[r]?.[c] !== 1 ||
				removed.has(key) ||
				seen.has(key)
			)
				return;
			seen.add(key);
			sink(r - 1, c);
			sink(r + 1, c);
			sink(r, c - 1);
			sink(r, c + 1);
		};
		for (const [r = 0, c = 0] of land) {
			if (!removed.has(`${r},${c}`) && !seen.has(`${r},${c}`)) {
				count++;
				sink(r, c);
			}
		}
		return count;
	};
	if (islands(new Set()) !== 1) return 0;
	if (land.some(([r, c]) => islands(new Set([`${r},${c}`])) !== 1)) return 1;
	return 2;
};

describe("1568. Minimum Number of Days to Disconnect Island", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minDays([
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 0, 0, 0],
			]),
		).toBe(2);
		expect(minDays([[1, 1]])).toBe(2);
	});

	it("handles a single cell and no land", () => {
		expect(minDays([[1]])).toBe(1);
		expect(minDays([[0]])).toBe(0);
	});

	it("matches removing cells directly on random grids", () => {
		const random = createRandom(1568);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, () =>
				Array.from({ length: n }, (): number => (random.next() < 0.7 ? 1 : 0)),
			);
			expect(minDays(grid)).toBe(byBruteForce(grid));
		}
	});
});
