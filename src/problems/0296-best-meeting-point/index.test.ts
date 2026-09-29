import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { bestMeetingPoint } from ".";

/** Tries every cell as the meeting point. */
const byBruteForce = (grid: number[][]): number => {
	const homes = grid.flatMap((row, r) =>
		row.flatMap((cell, c) => (cell === 1 ? [[r, c] as const] : [])),
	);
	let best = Number.POSITIVE_INFINITY;
	for (const [r] of grid.entries()) {
		for (const c of (grid[0] ?? []).keys()) {
			best = Math.min(
				best,
				homes.reduce(
					(sum, [hr, hc]) => sum + Math.abs(hr - r) + Math.abs(hc - c),
					0,
				),
			);
		}
	}
	return best;
};

describe("296. Best Meeting Point", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			bestMeetingPoint([
				[1, 0, 0, 0, 1],
				[0, 0, 0, 0, 0],
				[0, 0, 1, 0, 0],
			]),
		).toBe(6);
		expect(bestMeetingPoint([[1, 1]])).toBe(1);
	});

	it("matches trying every meeting point on random grids", () => {
		const random = createRandom(296);
		for (let run = 0; run < 500; run++) {
			const columns = random.int(1, 7);
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(columns, 0, 1),
			);
			if (grid.flat().filter((x) => x === 1).length < 2) continue;
			expect(bestMeetingPoint(grid)).toBe(byBruteForce(grid));
		}
	});
});
