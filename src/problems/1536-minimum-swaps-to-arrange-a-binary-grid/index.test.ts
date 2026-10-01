import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { minimumSwapsToArrangeABinaryGrid as minSwaps } from ".";

/** Breadth-first search over row orders. */
const byBruteForce = (grid: number[][]): number => {
	const n = grid.length;
	const valid = (order: number[]) =>
		order.every((row, i) =>
			(grid[row] ?? []).every((cell, c) => c <= i || cell === 0),
		);
	let frontier = [grid.map((_, i) => i)];
	const seen = new Set([frontier[0]?.join()]);
	for (let swaps = 0; frontier.length > 0; swaps++) {
		if (frontier.some(valid)) return swaps;
		const next: number[][] = [];
		for (const order of frontier) {
			for (let i = 0; i + 1 < n; i++) {
				const swapped = [...order];
				[swapped[i], swapped[i + 1]] = [swapped[i + 1] ?? 0, swapped[i] ?? 0];
				if (seen.has(swapped.join())) continue;
				seen.add(swapped.join());
				next.push(swapped);
			}
		}
		frontier = next;
	}
	return -1;
};

describe("1536. Minimum Swaps to Arrange a Binary Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			minSwaps([
				[0, 0, 1],
				[1, 1, 0],
				[1, 0, 0],
			]),
		).toBe(3);
		expect(
			minSwaps([
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
				[0, 1, 1, 0],
			]),
		).toBe(-1);
		expect(
			minSwaps([
				[1, 0, 0],
				[1, 1, 0],
				[1, 1, 1],
			]),
		).toBe(0);
	});

	it("matches searching over row orders on random grids", () => {
		const random = createRandom(1536);
		for (let run = 0; run < 200; run++) {
			const n = random.int(1, 5);
			// Random rows, each ending in a random number of zeros.
			const grid = Array.from({ length: n }, () => {
				const zeros = random.int(0, n);
				return Array.from({ length: n }, (_, c): number =>
					c >= n - zeros ? 0 : random.int(0, 1),
				);
			});
			expect(minSwaps(grid)).toBe(byBruteForce(grid));
		}
	});
});
