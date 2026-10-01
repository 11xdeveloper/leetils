import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { asFarFromLandAsPossible as maxDistance } from ".";

/** Measures every water cell against every land cell. */
const byBruteForce = (grid: number[][]): number => {
	const cells = grid.flatMap((row, r) =>
		row.map((value, c) => [r, c, value] as const),
	);
	const land = cells.filter(([, , value]) => value === 1);
	const water = cells.filter(([, , value]) => value === 0);
	if (land.length === 0 || water.length === 0) return -1;
	return Math.max(
		...water.map(([r, c]) =>
			Math.min(...land.map(([r2, c2]) => Math.abs(r - r2) + Math.abs(c - c2))),
		),
	);
};

describe("1162. As Far from Land as Possible", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxDistance([
				[1, 0, 1],
				[0, 0, 0],
				[1, 0, 1],
			]),
		).toBe(2);
		expect(
			maxDistance([
				[1, 0, 0],
				[0, 0, 0],
				[0, 0, 0],
			]),
		).toBe(4);
	});

	it("returns -1 without both land and water", () => {
		expect(
			maxDistance([
				[0, 0],
				[0, 0],
			]),
		).toBe(-1);
		expect(
			maxDistance([
				[1, 1],
				[1, 1],
			]),
		).toBe(-1);
	});

	it("matches measuring every pair on random grids", () => {
		const random = createRandom(1162);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 7);
			const density = random.next() * 0.4;
			const grid = Array.from({ length: n }, () =>
				Array.from({ length: n }, () => (random.next() < density ? 1 : 0)),
			);
			expect(maxDistance(grid)).toBe(byBruteForce(grid));
		}
	});
});
