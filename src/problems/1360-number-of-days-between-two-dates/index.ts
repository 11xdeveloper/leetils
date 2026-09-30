/**
 * 1360. Number of Days Between Two Dates
 *
 * Returns the number of days between two `YYYY-MM-DD` dates.
 *
 * Converts each date to a day number (days since 1 January 1971) and
 * subtracts.
 *
 * @see https://leetcode.com/problems/number-of-days-between-two-dates/
 * @difficulty Easy
 * @timeComplexity O(y) for y years since 1971
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfDaysBetweenTwoDates("2020-01-15", "2019-12-31"); // 15
 */
export const numberOfDaysBetweenTwoDates = (
	date1: string,
	date2: string,
): number => Math.abs(dayNumber(date1) - dayNumber(date2));

const dayNumber = (date: string): number => {
	const [year = 0, month = 0, day = 0] = date.split("-").map(Number);
	const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
	let days = day;
	for (let y = 1971; y < year; y++) days += isLeap(y) ? 366 : 365;
	const lengths = [
		31,
		isLeap(year) ? 29 : 28,
		31,
		30,
		31,
		30,
		31,
		31,
		30,
		31,
		30,
		31,
	];
	for (let m = 1; m < month; m++) days += lengths[m - 1] ?? 0;
	return days;
};
