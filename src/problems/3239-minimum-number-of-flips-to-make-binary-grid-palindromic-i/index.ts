/**
 * 3239. Minimum Number of Flips to Make Binary Grid Palindromic I
 *
 * The fewest cell flips to make either every row or every column of a
 * binary grid a palindrome.
 *
 * Count mismatched mirror pairs across rows and across columns, and take
 * the smaller.
 *
 * @see https://leetcode.com/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-i/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfFlipsToMakeBinaryGridPalindromicI([[1, 0, 0], [0, 0, 0], [0, 0, 1]]); // 2
 */
export const minimumNumberOfFlipsToMakeBinaryGridPalindromicI = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	let rows = 0;
	let cols = 0;
	for (let r = 0; r < m; r++)
		for (let c = 0; c < n; c++) {
			if (c < n - 1 - c && grid[r]?.[c] !== grid[r]?.[n - 1 - c]) rows++;
			if (r < m - 1 - r && grid[r]?.[c] !== grid[m - 1 - r]?.[c]) cols++;
		}
	return Math.min(rows, cols);
};
