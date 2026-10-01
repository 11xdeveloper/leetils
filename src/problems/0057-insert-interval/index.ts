/**
 * 57. Insert Interval
 *
 * Inserts `newInterval` into `intervals`, which are sorted by start and don't
 * overlap, merging where needed so the result is still sorted and
 * non-overlapping. Touching intervals count as overlapping.
 *
 * Copies the intervals that end before the new one starts, merges every
 * interval that overlaps it into one, then copies the rest.
 *
 * @see https://leetcode.com/problems/insert-interval/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n) for the returned intervals
 *
 * @example
 * insertInterval([[1, 3], [6, 9]], [2, 5]); // [[1, 5], [6, 9]]
 */
export const insertInterval = (
	intervals: readonly (readonly number[])[],
	newInterval: readonly number[],
): number[][] => {
	const result: number[][] = [];
	let [start = 0, end = 0] = newInterval;
	let i = 0;

	while (i < intervals.length && (intervals[i]?.[1] ?? 0) < start) {
		result.push([...(intervals[i] ?? [])]);
		i++;
	}

	while (i < intervals.length && (intervals[i]?.[0] ?? 0) <= end) {
		start = Math.min(start, intervals[i]?.[0] ?? 0);
		end = Math.max(end, intervals[i]?.[1] ?? 0);
		i++;
	}
	result.push([start, end]);

	while (i < intervals.length) {
		result.push([...(intervals[i] ?? [])]);
		i++;
	}

	return result;
};
