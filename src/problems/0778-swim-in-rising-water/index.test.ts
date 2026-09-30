import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { swimInRisingWater as swimInWater } from ".";

/** The first time at which a flood fill from the start reaches the end. */
const byFlooding = (grid: number[][]): number => {
	const n = grid.length;
	for (let t = 0; ; t++) {
		if ((grid[0]?.[0] ?? 0) > t) continue;
		const seen = new Set(["0,0"]);
		const queue = [[0, 0]];
		for (const [r = 0, c = 0] of queue) {
			for (const [dr, dc] of [
				[1, 0],
				[-1, 0],
				[0, 1],
				[0, -1],
			] as const) {
				const height = grid[r + dr]?.[c + dc];
				if (
					height === undefined ||
					height > t ||
					seen.has(`${r + dr},${c + dc}`)
				)
					continue;
				seen.add(`${r + dr},${c + dc}`);
				queue.push([r + dr, c + dc]);
			}
		}
		if (seen.has(`${n - 1},${n - 1}`)) return t;
	}
};

describe("778. Swim in Rising Water", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			swimInWater([
				[0, 2],
				[1, 3],
			]),
		).toBe(3);
		expect(
			swimInWater([
				[0, 1, 2, 3, 4],
				[24, 23, 22, 21, 5],
				[12, 13, 14, 15, 16],
				[11, 17, 18, 19, 20],
				[10, 9, 8, 7, 6],
			]),
		).toBe(16);
	});

	it("matches flooding at every time on random grids", () => {
		const random = createRandom(778);
		for (let run = 0; run < 300; run++) {
			const n = random.int(1, 6);
			const heights = Array.from({ length: n * n }, (_, i) => i).sort(
				() => random.next() - 0.5,
			);
			const grid = Array.from({ length: n }, (_, r) =>
				heights.slice(r * n, r * n + n),
			);
			expect(swimInWater(grid)).toBe(byFlooding(grid));
		}
	});
});
