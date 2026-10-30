import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumStrictlyIncreasingCellsInAMatrix as maxIncreasingCells } from ".";

/** Memoised search over every move. */
const byBruteForce = (mat: number[][]): number => {
	const memo = new Map<string, number>();
	const longest = (r: number, c: number): number => {
		const key = `${r},${c}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const here = mat[r]?.[c] ?? 0;
		let best = 1;
		for (const [i, row] of mat.entries())
			for (const [j, value] of row.entries())
				if ((i === r || j === c) && value > here)
					best = Math.max(best, 1 + longest(i, j));
		memo.set(key, best);
		return best;
	};
	let best = 0;
	for (const [r, row] of mat.entries())
		for (const c of row.keys()) best = Math.max(best, longest(r, c));
	return best;
};

describe("2713. Maximum Strictly Increasing Cells in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxIncreasingCells([
				[3, 1],
				[3, 4],
			]),
		).toBe(2);
		expect(
			maxIncreasingCells([
				[1, 1],
				[1, 1],
			]),
		).toBe(1);
		expect(
			maxIncreasingCells([
				[3, 1, 6],
				[-9, 5, 7],
			]),
		).toBe(4);
	});

	it("matches a memoised search on random matrices", () => {
		const random = createRandom(2713);
		for (let run = 0; run < 200; run++) {
			const cols = random.int(1, 4);
			const mat = Array.from({ length: random.int(1, 4) }, () =>
				random.array(cols, -3, 6),
			);
			expect(maxIncreasingCells(mat)).toBe(byBruteForce(mat));
		}
	});
});
