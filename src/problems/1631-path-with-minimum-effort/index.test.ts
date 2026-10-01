import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { pathWithMinimumEffort as minimumEffortPath } from ".";

/** Tries every effort limit from 0 upward, checking reachability with a search. */
const byBruteForce = (heights: number[][]): number => {
	const [rows, cols] = [heights.length, heights[0]?.length ?? 0];
	for (let limit = 0; ; limit++) {
		const seen = new Set([0]);
		const stack = [0];
		for (let cell = stack.pop(); cell !== undefined; cell = stack.pop()) {
			const [row, col] = [Math.floor(cell / cols), cell % cols];
			for (const [r, c] of [
				[row - 1, col],
				[row + 1, col],
				[row, col - 1],
				[row, col + 1],
			] as const) {
				if (r < 0 || r >= rows || c < 0 || c >= cols || seen.has(r * cols + c))
					continue;
				if (
					Math.abs((heights[r]?.[c] ?? 0) - (heights[row]?.[col] ?? 0)) > limit
				)
					continue;
				seen.add(r * cols + c);
				stack.push(r * cols + c);
			}
		}
		if (seen.has(rows * cols - 1)) return limit;
	}
};

describe("1631. Path With Minimum Effort", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minimumEffortPath([
				[1, 2, 2],
				[3, 8, 2],
				[5, 3, 5],
			]),
		).toBe(2);
		expect(
			minimumEffortPath([
				[1, 2, 3],
				[3, 8, 4],
				[5, 3, 5],
			]),
		).toBe(1);
		expect(
			minimumEffortPath([
				[1, 2, 1, 1, 1],
				[1, 2, 1, 2, 1],
				[1, 2, 1, 2, 1],
				[1, 2, 1, 2, 1],
				[1, 1, 1, 2, 1],
			]),
		).toBe(0);
	});

	it("returns 0 for a single cell", () => {
		expect(minimumEffortPath([[7]])).toBe(0);
	});

	it("matches trying every effort limit on random grids", () => {
		const random = createRandom(1631);
		for (let run = 0; run < 200; run++) {
			const [rows, cols] = [random.int(1, 5), random.int(1, 5)];
			const heights = Array.from({ length: rows }, () =>
				random.array(cols, 1, 20),
			);
			expect(minimumEffortPath(heights)).toBe(byBruteForce(heights));
		}
	});
});
