import { describe, expect, it } from "bun:test";
import { createRandom } from "../../testing/random";
import { getBiggestThreeRhombusSumsInAGrid as getBiggestThree } from ".";

/** Sums the cells at Manhattan distance exactly `size` from each centre. */
const byBruteForce = (grid: number[][]): number[] => {
	const [m, n] = [grid.length, grid[0]?.length ?? 0];
	const sums = new Set<number>();
	for (let r = 0; r < m; r++) {
		for (let c = 0; c < n; c++) {
			for (
				let size = 0;
				r - size >= 0 && r + size < m && c - size >= 0 && c + size < n;
				size++
			) {
				let sum = 0;
				for (let i = 0; i < m; i++)
					for (let j = 0; j < n; j++)
						if (Math.abs(i - r) + Math.abs(j - c) === size)
							sum += grid[i]?.[j] ?? 0;
				sums.add(sum);
			}
		}
	}
	return [...sums].sort((a, b) => b - a).slice(0, 3);
};

describe("1878. Get Biggest Three Rhombus Sums in a Grid", () => {
	it("solves the examples from the problem statement", () => {
		expect(
			getBiggestThree([
				[3, 4, 5, 1, 3],
				[3, 3, 4, 2, 3],
				[20, 30, 200, 40, 10],
				[1, 5, 5, 4, 1],
				[4, 3, 2, 2, 5],
			]),
		).toEqual([228, 216, 211]);
		expect(
			getBiggestThree([
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
			]),
		).toEqual([20, 9, 8]);
		expect(getBiggestThree([[7, 7, 7]])).toEqual([7]);
	});

	it("matches summing around each centre on random grids", () => {
		const random = createRandom(1878);
		for (let run = 0; run < 100; run++) {
			const grid = Array.from({ length: random.int(1, 7) }, () =>
				random.array(random.int(1, 1) * 6, 1, 50),
			);
			expect(getBiggestThree(grid)).toEqual(byBruteForce(grid));
		}
	});
});
