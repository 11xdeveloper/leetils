/**
 * 1124. Longest Well-Performing Interval
 *
 * A day is tiring if more than 8 hours were worked. Returns the length of the
 * longest run of days with more tiring days than non-tiring ones.
 *
 * Scores tiring days +1 and others −1, so the task is the longest interval
 * with a positive sum. With running total `s` at day `j`, if `s > 0` the
 * whole prefix works. Otherwise the best start is just after the first
 * point where the total was `s − 1`: totals move in steps of 1, so any
 * smaller total was first reached after `s − 1` was.
 *
 * @see https://leetcode.com/problems/longest-well-performing-interval/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * longestWellPerformingInterval([9, 9, 6, 0, 6, 6, 9]); // 3
 */
export const longestWellPerformingInterval = (
	hours: readonly number[],
): number => {
	const firstSeen = new Map<number, number>();
	let [total, longest] = [0, 0];
	hours.forEach((worked, day) => {
		total += worked > 8 ? 1 : -1;
		if (total > 0) longest = day + 1;
		else {
			const start = firstSeen.get(total - 1);
			if (start !== undefined) longest = Math.max(longest, day - start);
		}
		if (!firstSeen.has(total)) firstSeen.set(total, day);
	});
	return longest;
};
