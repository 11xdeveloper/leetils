import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { maximumNonNegativeProductInAMatrix as maxProductPath } from ".";

/** Follows every path. */
const byBruteForce = (grid: number[][]): number => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	let best = -1;
	const walk = (r: number, c: number, product: number): void => {
		const value = product * (grid[r]?.[c] ?? 0);
		if (r === m - 1 && c === n - 1) {
			best = Math.max(best, value);
			return;
		}
		if (r + 1 < m) walk(r + 1, c, value);
		if (c + 1 < n) walk(r, c + 1, value);
	};
	walk(0, 0, 1);
	// A negative times zero is -0 in JavaScript; the answer is plain 0.
	return best < 0 ? -1 : Math.abs(best);
};

describe("1594. Maximum Non Negative Product in a Matrix", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			maxProductPath([
				[-1, -2, -3],
				[-2, -3, -3],
				[-3, -3, -2],
			]),
		).toBe(-1);
		expect(
			maxProductPath([
				[1, -2, 1],
				[1, -2, 1],
				[3, -4, 1],
			]),
		).toBe(8);
		expect(
			maxProductPath([
				[1, 3],
				[0, -4],
			]),
		).toBe(0);
	});

	it("reduces huge products after maximising", () => {
		const grid = Array.from({ length: 15 }, () =>
			new Array<number>(15).fill(4),
		);
		expect(maxProductPath(grid)).toBe(Number(4n ** 29n % 1_000_000_007n));
	});

	it("matches following every path on random grids", () => {
		const random = createRandom(1594);
		for (let run = 0; run < 200; run++) {
			const [m, n] = [random.int(1, 4), random.int(1, 4)];
			const grid = Array.from({ length: m }, () => random.array(n, -4, 4));
			expect(maxProductPath(grid)).toBe(byBruteForce(grid));
		}
	});
});
