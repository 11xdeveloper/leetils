import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bricksFallingWhenHit as hitBricks } from ".";

/** Removes every brick not connected to the top row, returning how many were removed. */
const dropUnstable = (cells: number[][]): number => {
	const stable = new Set<string>();
	const queue = (cells[0] ?? []).flatMap((cell, col) =>
		cell === 1 ? [[0, col]] : [],
	);
	for (const [qr = 0, qc = 0] of queue) stable.add(`${qr},${qc}`);
	for (const [qr = 0, qc = 0] of queue) {
		for (const [dr, dc] of [
			[1, 0],
			[-1, 0],
			[0, 1],
			[0, -1],
		] as const) {
			const key = `${qr + dr},${qc + dc}`;
			if (cells[qr + dr]?.[qc + dc] === 1 && !stable.has(key)) {
				stable.add(key);
				queue.push([qr + dr, qc + dc]);
			}
		}
	}
	let dropped = 0;
	for (const [r, row] of cells.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === 1 && !stable.has(`${r},${c}`)) {
				row[c] = 0;
				dropped++;
			}
		}
	}
	return dropped;
};

/**
 * Applies each hit, then drops every brick no longer connected to the top
 * row. Bricks that were never stable don't count, so they're dropped first.
 */
const bySimulation = (grid: number[][], hits: number[][]): number[] => {
	const cells = grid.map((row) => [...row]);
	dropUnstable(cells);
	return hits.map(([r = 0, c = 0]) => {
		const row = cells[r];
		if (row?.[c] !== 1) return 0;
		row[c] = 0;
		return dropUnstable(cells);
	});
};

describe("803. Bricks Falling When Hit", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			hitBricks(
				[
					[1, 0, 0, 0],
					[1, 1, 1, 0],
				],
				[[1, 0]],
			),
		).toEqual([2]);
		expect(
			hitBricks(
				[
					[0, 0],
					[1, 1],
				],
				[[1, 0]],
			),
		).toEqual([0]);
		expect(
			hitBricks(
				[
					[1, 0, 0, 0],
					[1, 1, 0, 0],
				],
				[
					[1, 1],
					[1, 0],
				],
			),
		).toEqual([0, 0]);
	});

	it("matches dropping unstable bricks after each hit on random grids", () => {
		const random = createRandom(803);
		for (let run = 0; run < 500; run++) {
			const cols = random.int(1, 5);
			const grid = Array.from({ length: random.int(1, 5) }, () =>
				Array.from({ length: cols }, () => (random.int(0, 3) > 0 ? 1 : 0)),
			);
			const hits = Array.from({ length: random.int(1, 5) }, () => [
				random.int(0, grid.length - 1),
				random.int(0, cols - 1),
			]);
			const unique = [
				...new Map(hits.map((hit) => [hit.join(), hit])).values(),
			];
			expect(hitBricks(grid, unique)).toEqual(bySimulation(grid, unique));
		}
	});
});
