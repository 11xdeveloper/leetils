/**
 * 3687. Library Late Fee Calculator
 *
 * A book 1 day late costs 1; 2 to 5 days late, 2 per day; more than 5
 * days, 3 per day. Returns the total fee for `daysLate`.
 *
 * @see https://leetcode.com/problems/library-late-fee-calculator/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * libraryLateFeeCalculator([5, 1, 7]); // 32
 */
export const libraryLateFeeCalculator = (daysLate: readonly number[]): number =>
	daysLate.reduce(
		(total, days) => total + (days === 1 ? 1 : days <= 5 ? 2 * days : 3 * days),
		0,
	);
