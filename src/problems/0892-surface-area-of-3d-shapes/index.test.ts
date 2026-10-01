import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { surfaceAreaOf3dShapes as surfaceArea } from ".";

/** Counts exposed faces of every unit cube. */
const byCubes = (grid: number[][]): number => {
	const filled = (r: number, c: number, z: number) =>
		z >= 0 && z < (grid[r]?.[c] ?? 0);
	let faces = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, height] of row.entries()) {
			for (let z = 0; z < height; z++) {
				for (const [dr, dc, dz] of [
					[1, 0, 0],
					[-1, 0, 0],
					[0, 1, 0],
					[0, -1, 0],
					[0, 0, 1],
					[0, 0, -1],
				] as const) {
					if (!filled(r + dr, c + dc, z + dz)) faces++;
				}
			}
		}
	}
	return faces;
};

describe("892. Surface Area of 3D Shapes", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			surfaceArea([
				[1, 2],
				[3, 4],
			]),
		).toBe(34);
		expect(
			surfaceArea([
				[1, 1, 1],
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toBe(32);
		expect(
			surfaceArea([
				[2, 2, 2],
				[2, 1, 2],
				[2, 2, 2],
			]),
		).toBe(46);
	});

	it("matches counting cube faces on random grids", () => {
		const random = createRandom(892);
		for (let run = 0; run < 500; run++) {
			const n = random.int(1, 5);
			const grid = Array.from({ length: n }, () => random.array(n, 0, 4));
			expect(surfaceArea(grid)).toBe(byCubes(grid));
		}
	});
});
