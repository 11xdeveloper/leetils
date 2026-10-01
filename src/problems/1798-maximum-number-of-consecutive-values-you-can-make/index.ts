/**
 * 1798. Maximum Number of Consecutive Values You Can Make
 *
 * Returns how many consecutive integers starting at 0 can be made as sums
 * of some of `coins`.
 *
 * In increasing order: if every value below `reach` is makeable, a coin no
 * larger than `reach` extends that to `reach + coin`; a larger coin leaves
 * a gap that no later coin can fill.
 *
 * @see https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfConsecutiveValuesYouCanMake([1, 1, 1, 4]); // 8
 */
export const maximumNumberOfConsecutiveValuesYouCanMake = (
	coins: readonly number[],
): number => {
	let reach = 1;
	for (const coin of coins.toSorted((a, b) => a - b)) {
		if (coin > reach) break;
		reach += coin;
	}
	return reach;
};
