import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { longestIncreasingPathInAMatrix as longestPath } from ".";

/** Memoized depth-first search from every cell. */
const bySearch = (matrix: number[][]): number => {
	const memo = new Map<string, number>();
	const from = (r: number, c: number): number => {
		const key = `${r},${c}`;
		const cached = memo.get(key);
		if (cached !== undefined) return cached;
		const value = matrix[r]?.[c] ?? 0;
		let best = 1;
		for (const [nr, nc] of [
			[r + 1, c],
			[r - 1, c],
			[r, c + 1],
			[r, c - 1],
		] as const) {
			const next = matrix[nr]?.[nc];
			if (next !== undefined && next > value)
				best = Math.max(best, 1 + from(nr, nc));
		}
		memo.set(key, best);
		return best;
	};
	return Math.max(...matrix.flatMap((row, r) => row.map((_, c) => from(r, c))));
};

describe("329. Longest Increasing Path in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			longestPath([
				[9, 9, 4],
				[6, 6, 8],
				[2, 1, 1],
			]),
		).toBe(4);
		expect(
			longestPath([
				[3, 4, 5],
				[3, 2, 6],
				[2, 2, 1],
			]),
		).toBe(4);
		expect(longestPath([[1]])).toBe(1);
	});

	it("handles a snake-shaped path across the constraint's largest matrix", () => {
		const matrix = Array.from({ length: 200 }, (_, r) =>
			Array.from(
				{ length: 200 },
				(_, c) => r * 200 + (r % 2 === 0 ? c : 199 - c),
			),
		);
		expect(longestPath(matrix)).toBe(40_000);
	});

	it("matches a memoized search on random matrices", () => {
		const random = createRandom(329);
		for (let run = 0; run < 300; run++) {
			const columns = random.int(1, 6);
			const matrix = Array.from({ length: random.int(1, 6) }, () =>
				random.array(columns, 0, 9),
			);
			expect(longestPath(matrix)).toBe(bySearch(matrix));
		}
	});
});
