import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathWithMaximumGold as getMaximumGold } from ".";

/** Dynamic programming over (set of cells visited, last cell) for every walk. */
const byBruteForce = (grid: number[][]): number => {
	const cells = grid.flatMap((row, r) =>
		row.flatMap((gold, c) => (gold > 0 ? [[r, c, gold] as const] : [])),
	);
	const adjacent = (i: number, j: number) => {
		const [r1 = 0, c1 = 0] = cells[i] ?? [];
		const [r2 = 0, c2 = 0] = cells[j] ?? [];
		return Math.abs(r1 - r2) + Math.abs(c1 - c2) === 1;
	};
	const reachable = new Set<string>();
	let best = 0;
	const stack: [number, number][] = cells.map((_, i) => [1 << i, i]);
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [mask, last] = item;
		if (reachable.has(`${mask},${last}`)) continue;
		reachable.add(`${mask},${last}`);
		best = Math.max(
			best,
			cells.reduce(
				(sum, [, , gold], i) => sum + (mask & (1 << i) ? gold : 0),
				0,
			),
		);
		cells.forEach((_, next) => {
			if (!(mask & (1 << next)) && adjacent(last, next))
				stack.push([mask | (1 << next), next]);
		});
	}
	return best;
};

describe("1219. Path with Maximum Gold", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getMaximumGold([
				[0, 6, 0],
				[5, 8, 7],
				[0, 9, 0],
			]),
		).toBe(24);
		expect(
			getMaximumGold([
				[1, 0, 7],
				[2, 0, 6],
				[3, 4, 5],
				[0, 3, 0],
				[9, 0, 20],
			]),
		).toBe(28);
	});

	it("returns 0 without gold", () => {
		expect(
			getMaximumGold([
				[0, 0],
				[0, 0],
			]),
		).toBe(0);
	});

	it("handles 25 gold cells in a 5 × 5 block", () => {
		const block = Array.from({ length: 5 }, () => new Array<number>(5).fill(1));
		expect(getMaximumGold(block)).toBe(25);
	});

	it("matches searching over sets of visited cells on random grids", () => {
		const random = createRandom(1219);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, () =>
				Array.from({ length: n }, () =>
					random.next() < 0.6 ? random.int(1, 9) : 0,
				),
			);
			expect(getMaximumGold(grid)).toBe(byBruteForce(grid));
		}
	});
});
