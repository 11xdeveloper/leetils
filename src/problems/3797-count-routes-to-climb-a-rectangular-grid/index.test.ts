import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { countRoutesToClimbARectangularGrid as numberOfRoutes } from ".";

/** Walks every route. */
const byBruteForce = (grid: string[], d: number): number => {
	const n = grid.length;
	const m = grid[0]?.length ?? 0;
	let count = 0;
	const walk = (r: number, c: number, sideways: boolean): void => {
		if (r === 0) count++;
		for (let nr = r; nr >= Math.max(0, r - 1); nr--)
			for (let nc = 0; nc < m; nc++) {
				if (grid[nr]?.[nc] !== "." || (nr === r && (nc === c || sideways)))
					continue;
				if ((nr - r) ** 2 + (nc - c) ** 2 > d * d) continue;
				walk(nr, nc, nr === r);
			}
	};
	for (let c = 0; c < m; c++)
		if (grid[n - 1]?.[c] === ".") walk(n - 1, c, false);
	return count;
};

describe("3797. Count Routes to Climb a Rectangular Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(numberOfRoutes(["..", "#."], 1)).toBe(2);
		expect(numberOfRoutes(["..", "#."], 2)).toBe(4);
		expect(numberOfRoutes(["#"], 750)).toBe(0);
		expect(numberOfRoutes([".."], 1)).toBe(4);
	});

	it("matches walking every route on random grids", () => {
		const random = createRandom(3797);
		for (let run = 0; run < 200; run++) {
			const [n, m] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: n }, () => random.string(m, "..#"));
			const d = random.int(1, 3);
			expect(numberOfRoutes(grid, d)).toBe(byBruteForce(grid, d));
		}
	});
});
