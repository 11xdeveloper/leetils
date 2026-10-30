/**
 * 2335. Minimum Amount of Time to Fill Cups
 *
 * Each second fills two cups of different temperatures, or one cup. Given
 * how many cold, warm and hot cups are needed, returns the fewest seconds.
 *
 * At least half the cups (rounded up), and at least the largest count.
 *
 * @see https://leetcode.com/problems/minimum-amount-of-time-to-fill-cups/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAmountOfTimeToFillCups([5, 4, 4]); // 7
 */
export const minimumAmountOfTimeToFillCups = (
	amount: readonly number[],
): number =>
	Math.max(
		Math.max(...amount),
		Math.ceil(amount.reduce((sum, a) => sum + a, 0) / 2),
	);
