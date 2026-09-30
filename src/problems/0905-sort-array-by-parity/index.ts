/**
 * 905. Sort Array By Parity
 *
 * Returns the numbers of `nums` with every even number before every odd
 * number. Any such order is accepted; here each group keeps its original
 * order.
 *
 * Collects the evens, then the odds.
 *
 * @see https://leetcode.com/problems/sort-array-by-parity/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the result
 *
 * @example
 * sortArrayByParity([3, 1, 2, 4]); // [2, 4, 3, 1]
 */
export const sortArrayByParity = (nums: readonly number[]): number[] => [
	...nums.filter((num) => num % 2 === 0),
	...nums.filter((num) => num % 2 !== 0),
];
