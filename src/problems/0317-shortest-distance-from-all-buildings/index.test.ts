import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestDistanceFromAllBuildings as shortest } from ".";

/** Searches from each empty cell separately to every building. */
const byEachCell = (grid: number[][]): number => {
	const buildings = grid.flat().filter((cell) => cell === 1).length;
	let best = Number.POSITIVE_INFINITY;
	for (const [r, row] of grid.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell !== 0) continue;
			const seen = new Set([`${r},${c}`]);
			let frontier: [number, number][] = [[r, c]];
			let total = 0;
			let found = 0;
			for (let distance = 1; frontier.length > 0; distance++) {
				const next: [number, number][] = [];
				for (const [fr, fc] of frontier) {
					for (const [nr, nc] of [
						[fr + 1, fc],
						[fr - 1, fc],
						[fr, fc + 1],
						[fr, fc - 1],
					] as const) {
						const value = grid[nr]?.[nc];
						if (value === undefined || seen.has(`${nr},${nc}`)) continue;
						seen.add(`${nr},${nc}`);
						if (value === 1) {
							total += distance;
							found++;
						} else if (value === 0) {
							next.push([nr, nc]);
						}
					}
				}
				frontier = next;
			}
			if (found === buildings) best = Math.min(best, total);
		}
	}
	return best === Number.POSITIVE_INFINITY ? -1 : best;
};

describe("317. Shortest Distance from All Buildings", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortest([
				[1, 0, 2, 0, 1],
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
			]),
		).toBe(7);
		expect(shortest([[1, 0]])).toBe(1);
		expect(shortest([[1]])).toBe(-1);
	});

	it("returns -1 when a building is walled off", () => {
		expect(
			shortest([
				[1, 2, 0],
				[2, 0, 0],
				[0, 0, 1],
			]),
		).toBe(-1);
	});

	it("matches searching from each empty cell on random grids", () => {
		const random = createRandom(317);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				Array.from(
					{ length: columns },
					() => [0, 0, 0, 1, 2][random.int(0, 4)] ?? 0,
				),
			);
			if (!grid.flat().includes(1)) continue;
			expect(shortest(grid)).toBe(byEachCell(grid));
		}
	});
});
