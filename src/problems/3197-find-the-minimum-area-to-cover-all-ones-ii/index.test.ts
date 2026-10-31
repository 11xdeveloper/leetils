import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { findTheMinimumAreaToCoverAllOnesII as minimumSum } from ".";

/** Tries every triple of disjoint rectangles that covers all the 1s. */
const byBruteForce = (grid: number[][]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const rects: [number, number, number, number][] = [];
	for (let r1 = 0; r1 < m; r1++)
		for (let r2 = r1; r2 < m; r2++)
			for (let c1 = 0; c1 < n; c1++)
				for (let c2 = c1; c2 < n; c2++) {
					let hasOne = false;
					for (let r = r1; r <= r2; r++)
						for (let c = c1; c <= c2; c++)
							if (grid[r]?.[c] === 1) hasOne = true;
					if (hasOne) rects.push([r1, r2, c1, c2]);
				}
	const overlap = (a: number[], b: number[]) =>
		!(
			(a[1] ?? 0) < (b[0] ?? 0) ||
			(b[1] ?? 0) < (a[0] ?? 0) ||
			(a[3] ?? 0) < (b[2] ?? 0) ||
			(b[3] ?? 0) < (a[2] ?? 0)
		);
	const area = (a: number[]) =>
		((a[1] ?? 0) - (a[0] ?? 0) + 1) * ((a[3] ?? 0) - (a[2] ?? 0) + 1);
	const inside = (a: number[], r: number, c: number) =>
		r >= (a[0] ?? 0) &&
		r <= (a[1] ?? 0) &&
		c >= (a[2] ?? 0) &&
		c <= (a[3] ?? 0);
	let best = Number.POSITIVE_INFINITY;
	for (let i = 0; i < rects.length; i++)
		for (let j = i + 1; j < rects.length; j++)
			for (let k = j + 1; k < rects.length; k++) {
				const [a = [], b = [], c = []] = [rects[i], rects[j], rects[k]];
				if (overlap(a, b) || overlap(a, c) || overlap(b, c)) continue;
				const total = area(a) + area(b) + area(c);
				if (total >= best) continue;
				let covered = true;
				for (let r = 0; r < m && covered; r++)
					for (let col = 0; col < n; col++)
						if (
							grid[r]?.[col] === 1 &&
							!inside(a, r, col) &&
							!inside(b, r, col) &&
							!inside(c, r, col)
						) {
							covered = false;
							break;
						}
				if (covered) best = total;
			}
	return best;
};

describe("3197. Find the Minimum Area to Cover All Ones II", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumSum([
				[1, 0, 1],
				[1, 1, 1],
			]),
		).toBe(5);
		expect(
			minimumSum([
				[1, 0, 1, 0],
				[0, 1, 0, 1],
			]),
		).toBe(5);
	});

	it("matches trying every triple of rectangles on random grids", () => {
		const random = createRandom(3197);
		for (let run = 0; run < 60; run++) {
			const m = random.int(1, 4);
			const n = random.int(m >= 3 ? 1 : 3 - m + 1, 4);
			const grid = Array.from({ length: m }, () => random.array(n, 0, 1));
			if (grid.flat().filter((v) => v === 1).length < 3) continue;
			expect(minimumSum(grid)).toBe(byBruteForce(grid));
		}
	});
});
