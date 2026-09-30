/**
 * 1185. Day of the Week
 *
 * Returns the name of the weekday of the date `day`/`month`/`year`, between
 * 1971 and 2100.
 *
 * Counts the days since Friday 1 January 1971, adding up whole years and
 * then whole months, and takes the remainder by 7.
 *
 * @see https://leetcode.com/problems/day-of-the-week/
 * @difficulty Easy
 * @timeComplexity O(y) for y years since 1971
 * @spaceComplexity O(1)
 *
 * @example
 * dayOfTheWeek(31, 8, 2019); // "Saturday"
 */
export const dayOfTheWeek = (
	day: number,
	month: number,
	year: number,
): string => {
	const isLeap = (y: number) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
	let days = day - 1;
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
	return (
		[
			"Friday",
			"Saturday",
			"Sunday",
			"Monday",
			"Tuesday",
			"Wednesday",
			"Thursday",
		][days % 7] ?? ""
	);
};
