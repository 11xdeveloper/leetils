import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { shortestPathInBinaryMatrix as shortestPathBinaryMatrix } from ".";

/** Relaxes distances until nothing changes. */
const byRelaxation = (grid: number[][]): number => {
	const n = grid.length;
	const distance = grid.map((row) => row.map(() => Number.POSITIVE_INFINITY));
	if (grid[0]?.[0] === 0) (distance[0] ?? [])[0] = 1;
	for (let changed = true; changed; ) {
		changed = false;
		for (let r = 0; r < n; r++) {
			for (let c = 0; c < n; c++) {
				if (grid[r]?.[c] !== 0) continue;
				for (let dr = -1; dr <= 1; dr++) {
					for (let dc = -1; dc <= 1; dc++) {
						const via = (distance[r + dr]?.[c + dc] ?? Infinity) + 1;
						if (via < (distance[r]?.[c] ?? Infinity)) {
							(distance[r] ?? [])[c] = via;
							changed = true;
						}
					}
				}
			}
		}
	}
	const result = distance[n - 1]?.[n - 1] ?? Infinity;
	return result === Number.POSITIVE_INFINITY ? -1 : result;
};

describe("1091. Shortest Path in Binary Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			shortestPathBinaryMatrix([
				[0, 1],
				[1, 0],
			]),
		).toBe(2);
		expect(
			shortestPathBinaryMatrix([
				[0, 0, 0],
				[1, 1, 0],
				[1, 1, 0],
			]),
		).toBe(4);
		expect(
			shortestPathBinaryMatrix([
				[1, 0, 0],
				[1, 1, 0],
				[1, 1, 0],
			]),
		).toBe(-1);
	});

	it("matches relaxing distances on random grids", () => {
		const random = createRandom(1091);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 6);
			const grid = Array.from({ length: n }, () =>
				Array.from({ length: n }, () => (random.int(0, 2) === 0 ? 1 : 0)),
			);
			expect(shortestPathBinaryMatrix(grid)).toBe(byRelaxation(grid));
		}
	});
});
