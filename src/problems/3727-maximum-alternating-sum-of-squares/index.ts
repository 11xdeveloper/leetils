/**
 * 3727. Maximum Alternating Sum of Squares
 *
 * Rearrange `nums` to maximise the square of the first element, minus the
 * square of the second, plus the third's, and so on.
 *
 * The ⌈n/2⌉ largest squares go to the added positions.
 *
 * @see https://leetcode.com/problems/maximum-alternating-sum-of-squares/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumAlternatingSumOfSquares([1, -1, 2, -2, 3, -3]); // 16
 */
export const maximumAlternatingSumOfSquares = (
	nums: readonly number[],
): number => {
	const squares = nums.map((num) => num * num).sort((a, b) => b - a);
	const added = Math.ceil(squares.length / 2);
	return squares.reduce(
		(sum, square, i) => (i < added ? sum + square : sum - square),
		0,
	);
};
