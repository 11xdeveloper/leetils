/**
 * 2409. Count Days Spent Together
 *
 * Alice and Bob are in Rome over inclusive "MM-DD" date ranges in the same
 * non-leap year. Returns how many days they are there together.
 *
 * Convert dates to days of the year and intersect the ranges.
 *
 * @see https://leetcode.com/problems/count-days-spent-together/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countDaysSpentTogether("08-15", "08-18", "08-16", "08-19"); // 3
 */
export const countDaysSpentTogether = (
	arriveAlice: string,
	leaveAlice: string,
	arriveBob: string,
	leaveBob: string,
): number => {
	const monthLengths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	const dayOfYear = (date: string): number => {
		const [month = 1, day = 1] = date.split("-").map(Number);
		return (
			monthLengths.slice(0, month - 1).reduce((sum, d) => sum + d, 0) + day
		);
	};
	const start = Math.max(dayOfYear(arriveAlice), dayOfYear(arriveBob));
	const end = Math.min(dayOfYear(leaveAlice), dayOfYear(leaveBob));
	return Math.max(0, end - start + 1);
};
