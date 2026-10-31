import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumAreaOfTwoNonOverlappingSquareSubmatrices as maxArea } from ".";

/** Tries every pair of squares. */
const byBruteForce = (mat: number[][]): number => {
	const m = mat.length;
	const n = mat[0]?.length ?? 0;
	const full = (r: number, c: number, k: number) => {
		for (let i = r; i < r + k; i++)
			for (let j = c; j < c + k; j++) if (!mat[i]?.[j]) return false;
		return r + k <= m && c + k <= n;
	};
	for (let k = Math.min(m, n); k >= 1; k--) {
		const spots: number[][] = [];
		for (let r = 0; r + k <= m; r++)
			for (let c = 0; c + k <= n; c++) if (full(r, c, k)) spots.push([r, c]);
		for (const [r1 = 0, c1 = 0] of spots)
			for (const [r2 = 0, c2 = 0] of spots)
				if (Math.abs(r1 - r2) >= k || Math.abs(c1 - c2) >= k) return k * k;
	}
	return 0;
};

describe("4016. Maximum Area of Two Non-Overlapping Square Submatrices", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxArea([
				[1, 1, 1, 0],
				[1, 1, 1, 1],
				[0, 0, 1, 1],
			]),
		).toBe(4);
		expect(
			maxArea([
				[0, 1],
				[1, 0],
			]),
		).toBe(1);
		expect(
			maxArea([
				[0, 0],
				[0, 1],
			]),
		).toBe(0);
	});

	it("matches trying every pair on random matrices", () => {
		const random = createRandom(4016);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 6), random.int(1, 6)];
			const mat = Array.from({ length: m }, () =>
				Array.from({ length: n }, () => (random.int(0, 3) > 0 ? 1 : 0)),
			);
			expect(maxArea(mat)).toBe(byBruteForce(mat));
		}
	});
});
