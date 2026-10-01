/**
 * 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers
 *
 * Returns the fewest numbers made of only 0 and 1 digits that sum to the
 * decimal string `n`.
 *
 * Each such number adds at most 1 to every digit, so the largest digit is
 * needed, and that many always suffice.
 *
 * @see https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * partitioningIntoMinimumNumberOfDeciBinaryNumbers("82734"); // 8
 */
export const partitioningIntoMinimumNumberOfDeciBinaryNumbers = (
	n: string,
): number => {
	let largest = 0;
	for (const digit of n) largest = Math.max(largest, Number(digit));
	return largest;
};
