/**
 * 1716. Calculate Money in Leetcode Bank
 *
 * Deposits start at 1 on the first Monday and rise by 1 each day; each
 * Monday deposits 1 more than the previous Monday. Returns the total after
 * `n` days.
 *
 * Full weeks form an arithmetic series of 28, 35, 42, …; the remaining
 * days continue from that week's Monday.
 *
 * @see https://leetcode.com/problems/calculate-money-in-leetcode-bank/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * calculateMoneyInLeetcodeBank(10); // 37
 */
export const calculateMoneyInLeetcodeBank = (n: number): number => {
	const [weeks, days] = [Math.floor(n / 7), n % 7];
	const fullWeeks = 28 * weeks + (7 * weeks * (weeks - 1)) / 2;
	const rest = days * (weeks + 1) + (days * (days - 1)) / 2;
	return fullWeeks + rest;
};
