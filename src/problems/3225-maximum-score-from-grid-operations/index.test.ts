import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumScoreFromGridOperations as maximumScore } from ".";

/** Tries every choice of column heights. */
const byBruteForce = (grid: number[][]): number => {
	const n = grid.length;
	let best = 0;
	const heights = new Array<number>(n).fill(0);
	const score = (): number => {
		let total = 0;
		for (let j = 0; j < n; j++)
			for (let i = heights[j] ?? 0; i < n; i++)
				if ((heights[j - 1] ?? 0) > i || (heights[j + 1] ?? 0) > i)
					total += grid[i]?.[j] ?? 0;
		return total;
	};
	const choose = (j: number): void => {
		if (j === n) {
			best = Math.max(best, score());
			return;
		}
		for (let h = 0; h <= n; h++) {
			heights[j] = h;
			choose(j + 1);
		}
	};
	choose(0);
	return best;
};

describe("3225. Maximum Score From Grid Operations", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maximumScore([
				[0, 0, 0, 0, 0],
				[0, 0, 3, 0, 0],
				[0, 1, 0, 0, 0],
				[5, 0, 0, 3, 0],
				[0, 0, 0, 0, 2],
			]),
		).toBe(11);
		expect(
			maximumScore([
				[10, 9, 0, 0, 15],
				[7, 1, 0, 8, 0],
				[5, 20, 0, 11, 0],
				[0, 0, 0, 1, 2],
				[8, 12, 1, 10, 3],
			]),
		).toBe(94);
	});

	it("matches trying every choice on random grids", () => {
		const random = createRandom(3225);
		for (let run = 0; run < 100; run++) {
			const n = random.int(1, 4);
			const grid = Array.from({ length: n }, () => random.array(n, 0, 9));
			expect(maximumScore(grid)).toBe(byBruteForce(grid));
		}
	});
});
