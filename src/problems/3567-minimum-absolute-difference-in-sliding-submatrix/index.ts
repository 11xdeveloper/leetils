/**
 * 3567. Minimum Absolute Difference in Sliding Submatrix
 *
 * For each k × k submatrix, the smallest absolute difference between two
 * different values in it (0 if all its values are equal).
 *
 * Sort each submatrix's distinct values and take the smallest gap.
 *
 * @see https://leetcode.com/problems/minimum-absolute-difference-in-sliding-submatrix/
 * @difficulty Medium
 * @timeComplexity O(m · n · k² log k)
 * @spaceComplexity O(k²)
 *
 * @example
 * minimumAbsoluteDifferenceInSlidingSubmatrix([[1, 8], [3, -2]], 2); // [[2]]
 */
export const minimumAbsoluteDifferenceInSlidingSubmatrix = (
	grid: readonly (readonly number[])[],
	k: number,
): number[][] => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	return Array.from({ length: m - k + 1 }, (_, top) =>
		Array.from({ length: n - k + 1 }, (_, left) => {
			const values = new Set<number>();
			for (let r = top; r < top + k; r++)
				for (let c = left; c < left + k; c++) values.add(grid[r]?.[c] ?? 0);
			const sorted = [...values].sort((a, b) => a - b);
			let best = sorted.length < 2 ? 0 : Number.POSITIVE_INFINITY;
			for (let i = 1; i < sorted.length; i++)
				best = Math.min(best, (sorted[i] ?? 0) - (sorted[i - 1] ?? 0));
			return best;
		}),
	);
};
