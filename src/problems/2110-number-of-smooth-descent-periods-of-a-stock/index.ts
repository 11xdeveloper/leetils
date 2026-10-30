/**
 * 2110. Number of Smooth Descent Periods of a Stock
 *
 * A smooth descent period is a run of days where each price is exactly 1
 * below the day before (a single day counts). Returns how many there are.
 *
 * A day at the end of a run of length `r` ends `r` periods.
 *
 * @see https://leetcode.com/problems/number-of-smooth-descent-periods-of-a-stock/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfSmoothDescentPeriodsOfAStock([3, 2, 1, 4]); // 7
 */
export const numberOfSmoothDescentPeriodsOfAStock = (
	prices: readonly number[],
): number => {
	let [total, run] = [0, 0];
	for (const [i, price] of prices.entries()) {
		run = i > 0 && prices[i - 1] === price + 1 ? run + 1 : 1;
		total += run;
	}
	return total;
};
