import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { detectCyclesIn2dGrid as containsCycle } from ".";

/** Depth-first search that never steps straight back, looking for a visited cell. */
const byBruteForce = (grid: string[][]): boolean => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const seen = new Set<number>();
	const visit = (
		r: number,
		c: number,
		fromR: number,
		fromC: number,
	): boolean => {
		seen.add(r * n + c);
		for (const [r2, c2] of [
			[r - 1, c],
			[r + 1, c],
			[r, c - 1],
			[r, c + 1],
		] as const) {
			if (
				r2 < 0 ||
				r2 >= m ||
				c2 < 0 ||
				c2 >= n ||
				grid[r2]?.[c2] !== grid[r]?.[c]
			)
				continue;
			if (r2 === fromR && c2 === fromC) continue;
			if (seen.has(r2 * n + c2) || visit(r2, c2, r, c)) return true;
		}
		return false;
	};
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++)
			if (!seen.has(r * n + c) && visit(r, c, -1, -1)) return true;
	}
	return false;
};

const parse = (rows: string[]) => rows.map((row) => [...row]);

describe("1559. Detect Cycles in 2D Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(containsCycle(parse(["aaaa", "abba", "abba", "aaaa"]))).toBeTrue();
		expect(containsCycle(parse(["ccca", "cdcc", "ccec", "fccc"]))).toBeTrue();
		expect(containsCycle(parse(["abb", "bzb", "bba"]))).toBeFalse();
	});

	it("handles a 500 × 500 grid of one letter", () => {
		expect(
			containsCycle(
				Array.from({ length: 500 }, () => new Array<string>(500).fill("a")),
			),
		).toBeTrue();
	});

	it("matches a depth-first search on random grids", () => {
		const random = createRandom(1559);
		for (let run = 0; run < 300; run++) {
			const [m, n] = [random.int(1, 5), random.int(1, 5)];
			const grid = Array.from({ length: m }, () => [...random.string(n, "ab")]);
			expect(containsCycle(grid)).toBe(byBruteForce(grid));
		}
	});
});
