/**
 * 1507. Reformat Date
 *
 * Converts a date like `"20th Oct 2052"` to `"2052-10-20"`.
 *
 * Splits the parts, drops the day's suffix and looks the month up.
 *
 * @see https://leetcode.com/problems/reformat-date/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * reformatDate("6th Jun 1933"); // "1933-06-06"
 */
export const reformatDate = (date: string): string => {
	const [day = "", month = "", year = ""] = date.split(" ");
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const monthNumber = String(months.indexOf(month) + 1).padStart(2, "0");
	return `${year}-${monthNumber}-${day.slice(0, -2).padStart(2, "0")}`;
};
