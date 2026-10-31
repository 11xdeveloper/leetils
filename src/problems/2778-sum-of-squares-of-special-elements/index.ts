/**
 * 2778. Sum of Squares of Special Elements
 *
 * Element `i`, counting from 1, is special if `i` divides the array's
 * length. Returns the sum of the special elements' squares.
 *
 * Check each index.
 *
 * @see https://leetcode.com/problems/sum-of-squares-of-special-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sumOfSquaresOfSpecialElements([1, 2, 3, 4]); // 21
 */
export const sumOfSquaresOfSpecialElements = (
	nums: readonly number[],
): number =>
	nums.reduce(
		(sum, num, i) => (nums.length % (i + 1) === 0 ? sum + num * num : sum),
		0,
	);
