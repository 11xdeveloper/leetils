import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pacificAtlanticWaterFlow as flow } from ".";

/** Pours water from each cell and sees which oceans it reaches. */
const byPouring = (heights: number[][]): number[][] => {
	const rows = heights.length;
	const columns = heights[0]?.length ?? 0;
	const cells: number[][] = [];
	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			let pacific = false;
			let atlantic = false;
			const seen = new Set([`${r},${c}`]);
			const stack: [number, number][] = [[r, c]];
			for (let cell = stack.pop(); cell; cell = stack.pop()) {
				const [cr, cc] = cell;
				if (cr === 0 || cc === 0) pacific = true;
				if (cr === rows - 1 || cc === columns - 1) atlantic = true;
				for (const [nr, nc] of [
					[cr + 1, cc],
					[cr - 1, cc],
					[cr, cc + 1],
					[cr, cc - 1],
				] as const) {
					const next = heights[nr]?.[nc];
					if (
						next === undefined ||
						next > (heights[cr]?.[cc] ?? 0) ||
						seen.has(`${nr},${nc}`)
					)
						continue;
					seen.add(`${nr},${nc}`);
					stack.push([nr, nc]);
				}
			}
			if (pacific && atlantic) cells.push([r, c]);
		}
	}
	return cells;
};

describe("417. Pacific Atlantic Water Flow", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			flow([
				[1, 2, 2, 3, 5],
				[3, 2, 3, 4, 4],
				[2, 4, 5, 3, 1],
				[6, 7, 1, 4, 5],
				[5, 1, 1, 2, 4],
			]),
		).toEqual([
			[0, 4],
			[1, 3],
			[1, 4],
			[2, 2],
			[3, 0],
			[3, 1],
			[4, 0],
		]);
		expect(flow([[1]])).toEqual([[0, 0]]);
	});

	it("matches pouring water from each cell on random islands", () => {
		const random = createRandom(417);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const heights = Array.from({ length: random.int(1, 6) }, () =>
				random.array(columns, 0, 5),
			);
			expect(flow(heights)).toEqual(byPouring(heights));
		}
	});
});
