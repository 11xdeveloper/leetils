import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { lengthOfLongestVShapedDiagonalSegment as lenOfVDiagonal } from ".";

/** Walks every segment from every 1 with every turning point. */
const byBruteForce = (grid: number[][]): number => {
	const dirs = [
		[1, 1],
		[1, -1],
		[-1, -1],
		[-1, 1],
	];
	const at = (r: number, c: number) => grid[r]?.[c] ?? -1;
	let best = 0;
	grid.forEach((row, r) => {
		row.forEach((v, c) => {
			if (v !== 1) return;
			best = Math.max(best, 1);
			dirs.forEach(([dr = 0, dc = 0], d) => {
				// Walk straight, trying a turn after every step.
				for (let turnAfter = 0; turnAfter < 30; turnAfter++) {
					let [cr, cc] = [r, c];
					let length = 1;
					let want = 2;
					let [mr, mc] = [dr, dc];
					for (let step = 0; ; step++) {
						if (step === turnAfter) {
							const [tr = 0, tc = 0] = dirs[(d + 1) % 4] ?? [];
							[mr, mc] = [tr, tc];
						}
						if (at(cr + mr, cc + mc) !== want) break;
						cr += mr;
						cc += mc;
						length++;
						want = 2 - want;
					}
					best = Math.max(best, length);
				}
			});
		});
	});
	return best;
};

describe("3459. Length of Longest V-Shaped Diagonal Segment", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			lenOfVDiagonal([
				[2, 2, 1, 2, 2],
				[2, 0, 2, 2, 0],
				[2, 0, 1, 1, 0],
				[1, 0, 2, 2, 2],
				[2, 0, 0, 2, 2],
			]),
		).toBe(5);
		expect(
			lenOfVDiagonal([
				[2, 2, 2, 2, 2],
				[2, 0, 2, 2, 0],
				[2, 0, 1, 1, 0],
				[1, 0, 2, 2, 2],
				[2, 0, 0, 2, 2],
			]),
		).toBe(4);
		expect(lenOfVDiagonal([[1]])).toBe(1);
	});

	it("matches walking every segment on random grids", () => {
		const random = createRandom(3459);
		for (let run = 0; run < 200; run++) {
			const grid = Array.from({ length: random.int(1, 6) }, () =>
				random.array(5, 0, 2),
			);
			expect(lenOfVDiagonal(grid)).toBe(byBruteForce(grid));
		}
	});
});
