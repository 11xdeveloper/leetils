/**
 * 1118. Number of Days in a Month
 *
 * Returns the number of days in `month` (1–12) of `year`, in the Gregorian
 * calendar.
 *
 * A table of month lengths, with February's depending on whether `year` is a
 * leap year: divisible by 4, except for centuries not divisible by 400.
 *
 * @see https://leetcode.com/problems/number-of-days-in-a-month/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfDaysInAMonth(2000, 2); // 29
 */
export const numberOfDaysInAMonth = (year: number, month: number): number => {
	if (month === 2) {
		const leap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
		return leap ? 29 : 28;
	}
	return [4, 6, 9, 11].includes(month) ? 30 : 31;
};
