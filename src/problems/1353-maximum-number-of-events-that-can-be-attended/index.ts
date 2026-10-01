import { Heap } from "../../internal/heap";

/**
 * 1353. Maximum Number of Events That Can Be Attended
 *
 * Event `[start, end]` can be attended on any one day in that range, and
 * only one event can be attended each day. Returns the most events that
 * can be attended.
 *
 * Goes day by day, keeping the events that have started in a min-heap by
 * end day. Each day attend the open event ending soonest, after dropping
 * any that have already ended.
 *
 * @see https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended/
 * @difficulty Medium
 * @timeComplexity O(n log n + D) for D days
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfEventsThatCanBeAttended([[1, 2], [2, 3], [3, 4], [1, 2]]); // 4
 */
export const maximumNumberOfEventsThatCanBeAttended = (
	events: readonly (readonly number[])[],
): number => {
	const sorted = events.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const ends = new Heap<number>((a, b) => a - b);
	let [attended, next] = [0, 0];
	const lastDay = Math.max(...events.map(([, end = 0]) => end));
	for (let day = sorted[0]?.[0] ?? 1; day <= lastDay; day++) {
		for (; next < sorted.length && (sorted[next]?.[0] ?? 0) === day; next++) {
			ends.push(sorted[next]?.[1] ?? 0);
		}
		while (ends.size > 0 && (ends.peek() ?? 0) < day) ends.pop();
		if (ends.size > 0) {
			ends.pop();
			attended++;
		}
	}
	return attended;
};
