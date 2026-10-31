import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumPathIntersectionSumInAGrid as maxScore } from ".";

/** Tries every pair of paths. */
const byBruteForce = (grid: number[][]): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const paths = (
		r: number,
		c: number,
		dr: number,
		goalR: number,
	): number[][] => {
		if (r === goalR && c === n - 1) return [[r * n + c]];
		const out: number[][] = [];
		if (r !== goalR)
			for (const p of paths(r + dr, c, dr, goalR)) out.push([r * n + c, ...p]);
		if (c < n - 1)
			for (const p of paths(r, c + 1, dr, goalR)) out.push([r * n + c, ...p]);
		return out;
	};
	const first = paths(0, 0, 1, m - 1);
	const second = paths(m - 1, 0, -1, 0);
	let best = Number.NEGATIVE_INFINITY;
	for (const p of first) {
		const set = new Set(p);
		for (const q of second) {
			const shared = q.filter((x) => set.has(x));
			best = Math.max(
				best,
				shared.reduce((s, x) => s + (grid[Math.floor(x / n)]?.[x % n] ?? 0), 0),
			);
		}
	}
	return best;
};

describe("3938. Maximum Path Intersection Sum in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxScore([
				[1, 2, 0, -3],
				[1, -2, 1, 0],
				[-4, 2, -1, 3],
				[3, -3, 3, -2],
				[-1, -5, 0, 1],
			]),
		).toBe(4);
		expect(
			maxScore([
				[4, -2, -3],
				[-1, -3, -1],
				[-4, 2, -1],
			]),
		).toBe(3);
	});

	it("matches trying every pair of paths on random grids", () => {
		const random = createRandom(3938);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(2, 4), random.int(2, 4)];
			const grid = Array.from({ length: m }, () => random.array(n, -5, 5));
			expect(maxScore(grid)).toBe(byBruteForce(grid));
		}
	});
});
