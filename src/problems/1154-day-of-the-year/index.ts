/**
 * 1154. Day of the Year
 *
 * Returns the day number within its year of the Gregorian date `date`,
 * given as `YYYY-MM-DD`.
 *
 * Adds up the lengths of the earlier months, with February having 29 days
 * in leap years.
 *
 * @see https://leetcode.com/problems/day-of-the-year/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * dayOfTheYear("2019-02-10"); // 41
 */
export const dayOfTheYear = (date: string): number => {
	const [year = 0, month = 0, day = 0] = date.split("-").map(Number);
	const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
	const lengths = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	return lengths.slice(0, month - 1).reduce((sum, days) => sum + days, day);
};
