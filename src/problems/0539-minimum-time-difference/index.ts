/**
 * 539. Minimum Time Difference
 *
 * Returns the smallest difference in minutes between any two of the 24-hour
 * `"HH:MM"` times in `timePoints`, going round midnight if that's shorter.
 *
 * There are only 1,440 minutes in a day, so it marks each one present (a
 * repeat means the answer is 0), then compares neighbours in time order,
 * including the last with the first across midnight.
 *
 * @see https://leetcode.com/problems/minimum-time-difference/
 * @difficulty Medium
 * @timeComplexity O(n + 1440)
 * @spaceComplexity O(1440)
 *
 * @example
 * minimumTimeDifference(["23:59", "00:00"]); // 1
 */
export const minimumTimeDifference = (
	timePoints: readonly string[],
): number => {
	const day = 24 * 60;
	if (timePoints.length > day) return 0;

	const present = new Uint8Array(day);
	for (const time of timePoints) {
		const minute = Number(time.slice(0, 2)) * 60 + Number(time.slice(3));
		if (present[minute]) return 0;
		present[minute] = 1;
	}

	let smallest = day;
	let first = -1;
	let previous = -1;
	for (let minute = 0; minute < day; minute++) {
		if (!present[minute]) continue;
		if (previous === -1) first = minute;
		else smallest = Math.min(smallest, minute - previous);
		previous = minute;
	}

	return Math.min(smallest, first + day - previous);
};
