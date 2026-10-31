/**
 * 3467. Transform Array by Parity
 *
 * Replace even numbers with 0 and odd ones with 1, then sort.
 *
 * Count the evens; they become the leading zeros.
 *
 * @see https://leetcode.com/problems/transform-array-by-parity/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * transformArrayByParity([4, 3, 2, 1]); // [0, 0, 1, 1]
 */
export const transformArrayByParity = (nums: readonly number[]): number[] => {
	const evens = nums.filter((num) => num % 2 === 0).length;
	return nums.map((_, i) => (i < evens ? 0 : 1));
};
