/**
 * 2931. Maximum Spending After Buying Items
 *
 * Each shop's items are sorted by non-increasing value, and on day `d`
 * you buy the rightmost remaining item of some shop for `value · d`.
 * Returns the most you can spend buying everything.
 *
 * The rightmost items are always the cheapest left, so you can buy in
 * increasing order of value: sort all values and weight them by day.
 *
 * @see https://leetcode.com/problems/maximum-spending-after-buying-items/
 * @difficulty Hard
 * @timeComplexity O(m · n log(m · n))
 * @spaceComplexity O(m · n)
 *
 * @example
 * maximumSpendingAfterBuyingItems([[8, 5, 2], [6, 4, 1], [9, 7, 3]]); // 285
 */
export const maximumSpendingAfterBuyingItems = (
	values: readonly (readonly number[])[],
): number =>
	values
		.flat()
		.sort((a, b) => a - b)
		.reduce((total, value, day) => total + value * (day + 1), 0);
