/**
 * 2679. Sum in a Matrix
 *
 * Repeatedly removes the largest number from each row and adds the
 * largest of those removed to the score, until the matrix is empty.
 * Returns the score.
 *
 * Sort each row; round `j` removes column `j`.
 *
 * @see https://leetcode.com/problems/sum-in-a-matrix/
 * @difficulty Medium
 * @timeComplexity O(m · n log n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * sumInAMatrix([[7, 2, 1], [6, 4, 2], [6, 5, 3], [3, 2, 1]]); // 15
 */
export const sumInAMatrix = (nums: readonly (readonly number[])[]): number => {
	const sorted = nums.map((row) => row.toSorted((a, b) => a - b));
	let score = 0;
	for (let c = 0; c < (sorted[0]?.length ?? 0); c++)
		score += Math.max(...sorted.map((row) => row[c] ?? 0));
	return score;
};
