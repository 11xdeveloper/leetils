/**
 * 2133. Check if Every Row and Column Contains All Numbers
 *
 * Returns whether every row and column of the `n × n` matrix contains all
 * the numbers from 1 to `n`.
 *
 * Each row and column must have `n` distinct values; the bounds then
 * force them to be exactly 1 to `n`.
 *
 * @see https://leetcode.com/problems/check-if-every-row-and-column-contains-all-numbers/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfEveryRowAndColumnContainsAllNumbers([[1, 2, 3], [3, 1, 2], [2, 3, 1]]); // true
 */
export const checkIfEveryRowAndColumnContainsAllNumbers = (
	matrix: readonly (readonly number[])[],
): boolean => {
	const n = matrix.length;
	const columns = matrix.map((_, c) => matrix.map((row) => row[c] ?? 0));
	return [...matrix, ...columns].every(
		(line) => new Set(line).size === n && line.every((v) => v >= 1 && v <= n),
	);
};
