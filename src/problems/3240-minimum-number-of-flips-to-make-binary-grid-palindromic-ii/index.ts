/**
 * 3240. Minimum Number of Flips to Make Binary Grid Palindromic II
 *
 * The fewest cell flips to make every row and every column of a binary grid
 * a palindrome, with the total number of 1s divisible by 4.
 *
 * Cells fall into groups of four mirror images, which must all match:
 * flip the minority. With an odd dimension, the middle row or column
 * pairs cells up instead; matching pairs of 1s add 2 to the count, so if
 * some pair mismatches (costing 1 either way) it can fix the count mod 4,
 * and otherwise a stray 2 costs two flips. A centre cell must be 0.
 *
 * @see https://leetcode.com/problems/minimum-number-of-flips-to-make-binary-grid-palindromic-ii/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumNumberOfFlipsToMakeBinaryGridPalindromicII([[1, 0, 0], [0, 1, 0], [0, 0, 1]]); // 3
 */
export const minimumNumberOfFlipsToMakeBinaryGridPalindromicII = (
	grid: readonly (readonly number[])[],
): number => {
	const m = grid.length;
	const n = grid[0]?.length ?? 0;
	const at = (r: number, c: number): number => grid[r]?.[c] ?? 0;
	let flips = 0;
	for (let r = 0; r < Math.floor(m / 2); r++)
		for (let c = 0; c < Math.floor(n / 2); c++) {
			const ones =
				at(r, c) +
				at(r, n - 1 - c) +
				at(m - 1 - r, c) +
				at(m - 1 - r, n - 1 - c);
			flips += Math.min(ones, 4 - ones);
		}
	let mismatched = 0;
	let pairedOnes = 0;
	if (m % 2 === 1) {
		const r = (m - 1) / 2;
		for (let c = 0; c < Math.floor(n / 2); c++)
			if (at(r, c) !== at(r, n - 1 - c)) mismatched++;
			else pairedOnes += 2 * at(r, c);
	}
	if (n % 2 === 1) {
		const c = (n - 1) / 2;
		for (let r = 0; r < Math.floor(m / 2); r++)
			if (at(r, c) !== at(m - 1 - r, c)) mismatched++;
			else pairedOnes += 2 * at(r, c);
	}
	if (m % 2 === 1 && n % 2 === 1) flips += at((m - 1) / 2, (n - 1) / 2);
	return flips + (mismatched > 0 ? mismatched : pairedOnes % 4 === 2 ? 2 : 0);
};
