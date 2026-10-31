/**
 * 2088. Count Fertile Pyramids in a Land
 *
 * Counts the pyramids and inverse pyramids of fertile cells (1s) with at
 * least two rows: an apex whose row `i` below (or above) it spans
 * `2i + 1` fertile cells centred under the apex.
 *
 * `height[r][c]`, the tallest pyramid with its apex at (r, c), is one more
 * than the least of the three heights in the next row below. An apex of
 * height `h` has `h - 1` pyramids. Repeat upwards for inverse pyramids.
 *
 * @see https://leetcode.com/problems/count-fertile-pyramids-in-a-land/
 * @difficulty Hard
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countFertilePyramidsInALand([[0, 1, 1, 0], [1, 1, 1, 1]]); // 2
 */
export const countFertilePyramidsInALand = (
	grid: readonly (readonly number[])[],
): number => {
	const count = (rows: readonly (readonly number[])[]): number => {
		let below: number[] = [];
		let total = 0;
		for (const row of rows) {
			const heights = row.map((cell, c) => {
				if (!cell) return 0;
				return (
					1 + Math.min(below[c - 1] ?? 0, below[c] ?? 0, below[c + 1] ?? 0)
				);
			});
			for (const height of heights) total += Math.max(0, height - 1);
			below = heights;
		}
		return total;
	};
	return count(grid.toReversed()) + count(grid);
};
