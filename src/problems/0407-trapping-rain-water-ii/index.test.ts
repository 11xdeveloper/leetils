import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { trappingRainWaterII } from ".";

/**
 * Starts every cell's water level at the maximum and repeatedly lowers it
 * to what its neighbours allow, until nothing changes.
 */
const byRelaxation = (heights: number[][]): number => {
	const rows = heights.length;
	const columns = heights[0]?.length ?? 0;
	const top = Math.max(...heights.flat());
	const level = heights.map((row, r) =>
		row.map((h, c) =>
			r === 0 || c === 0 || r === rows - 1 || c === columns - 1 ? h : top,
		),
	);
	for (let changed = true; changed; ) {
		changed = false;
		for (let r = 1; r < rows - 1; r++) {
			for (let c = 1; c < columns - 1; c++) {
				const lowest = Math.min(
					level[r - 1]?.[c] ?? 0,
					level[r + 1]?.[c] ?? 0,
					level[r]?.[c - 1] ?? 0,
					level[r]?.[c + 1] ?? 0,
				);
				const next = Math.max(heights[r]?.[c] ?? 0, lowest);
				if (next < (level[r]?.[c] ?? 0)) {
					(level[r] ?? [])[c] = next;
					changed = true;
				}
			}
		}
	}
	return level
		.flat()
		.reduce((sum, l, i) => sum + l - (heights.flat()[i] ?? 0), 0);
};

describe("407. Trapping Rain Water II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			trappingRainWaterII([
				[1, 4, 3, 1, 3, 2],
				[3, 2, 1, 3, 2, 4],
				[2, 3, 3, 2, 3, 1],
			]),
		).toBe(4);
		expect(
			trappingRainWaterII([
				[3, 3, 3, 3, 3],
				[3, 2, 2, 2, 3],
				[3, 2, 1, 2, 3],
				[3, 2, 2, 2, 3],
				[3, 3, 3, 3, 3],
			]),
		).toBe(10);
	});

	it("matches lowering water levels until they settle on random maps", () => {
		const random = createRandom(407);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 7);
			const heights = Array.from({ length: random.int(1, 7) }, () =>
				random.array(columns, 0, 6),
			);
			expect(trappingRainWaterII(heights)).toBe(byRelaxation(heights));
		}
	});
});
