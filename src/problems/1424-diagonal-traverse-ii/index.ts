/**
 * 1424. Diagonal Traverse II
 *
 * Lists the elements of the jagged array `nums` diagonal by diagonal, each
 * diagonal read from bottom-left to top-right.
 *
 * Cells on a diagonal share `r + c`. Going through the rows from the last
 * and bucketing by diagonal puts each bucket in bottom-to-top order.
 *
 * @see https://leetcode.com/problems/diagonal-traverse-ii/
 * @difficulty Medium
 * @timeComplexity O(total elements)
 * @spaceComplexity O(total elements)
 *
 * @example
 * diagonalTraverseII([[1, 2, 3], [4, 5, 6], [7, 8, 9]]); // [1, 4, 2, 7, 5, 3, 8, 6, 9]
 */
export const diagonalTraverseII = (
	nums: readonly (readonly number[])[],
): number[] => {
	const diagonals: number[][] = [];
	for (let r = nums.length - 1; r >= 0; r--) {
		(nums[r] ?? []).forEach((value, c) => {
			const diagonal = diagonals[r + c] ?? [];
			diagonals[r + c] = diagonal;
			diagonal.push(value);
		});
	}
	return diagonals.flatMap((diagonal) => diagonal ?? []);
};
