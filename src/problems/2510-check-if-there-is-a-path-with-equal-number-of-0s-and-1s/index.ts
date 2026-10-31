/**
 * 2510. Check if There is a Path With Equal Number of 0's And 1's
 *
 * Returns whether some path from the top-left to the bottom-right of a
 * binary grid, moving only right or down, visits as many 0s as 1s.
 *
 * Every path has `m + n - 1` cells. Find the fewest and most 1s any path
 * can collect; moving between neighbouring paths changes the count by at
 * most one, so every count in between is reachable too.
 *
 * @see https://leetcode.com/problems/check-if-there-is-a-path-with-equal-number-of-0s-and-1s/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfThereIsAPathWithEqualNumberOf0sAnd1s([[0, 1, 0, 0], [0, 1, 0, 0], [1, 0, 1, 0]]); // true
 */
export const checkIfThereIsAPathWithEqualNumberOf0sAnd1s = (
	grid: readonly (readonly number[])[],
): boolean => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	if ((rows + cols - 1) % 2 === 1) return false;

	const fewest = Array.from({ length: cols }, () => Number.POSITIVE_INFINITY);
	const most = Array.from({ length: cols }, () => Number.NEGATIVE_INFINITY);
	for (let r = 0; r < rows; r++)
		for (let c = 0; c < cols; c++) {
			const value = grid[r]?.[c] ?? 0;
			if (r === 0 && c === 0) {
				fewest[0] = value;
				most[0] = value;
				continue;
			}
			const left = c > 0;
			fewest[c] =
				value +
				Math.min(
					fewest[c] ?? 0,
					left ? (fewest[c - 1] ?? 0) : Number.POSITIVE_INFINITY,
				);
			most[c] =
				value +
				Math.max(
					most[c] ?? 0,
					left ? (most[c - 1] ?? 0) : Number.NEGATIVE_INFINITY,
				);
		}

	const half = (rows + cols - 1) / 2;
	return (fewest[cols - 1] ?? 0) <= half && half <= (most[cols - 1] ?? 0);
};
