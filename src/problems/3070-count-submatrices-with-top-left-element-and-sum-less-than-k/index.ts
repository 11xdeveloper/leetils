/**
 * 3070. Count Submatrices with Top-Left Element and Sum Less Than k
 *
 * Count the submatrices that contain the grid's top-left cell and have a
 * sum of at most `k`.
 *
 * Each such submatrix is a prefix rectangle, so count the 2D prefix sums
 * that are at most `k`, keeping one row of them at a time.
 *
 * @see https://leetcode.com/problems/count-submatrices-with-top-left-element-and-sum-less-than-k/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * countSubmatricesWithTopLeftElementAndSumLessThanK([[7, 6, 3], [6, 6, 1]], 18); // 4
 */
export const countSubmatricesWithTopLeftElementAndSumLessThanK = (
	grid: readonly (readonly number[])[],
	k: number,
): number => {
	const columns = new Float64Array(grid[0]?.length ?? 0);
	let count = 0;
	for (const row of grid) {
		let sum = 0;
		row.forEach((value, c) => {
			columns[c] = (columns[c] ?? 0) + value;
			sum += columns[c] ?? 0;
			if (sum <= k) count++;
		});
	}
	return count;
};
