import { Heap } from "../../internal/heap";

/**
 * 1851. Minimum Interval to Include Each Query
 *
 * For each query, returns the size of the smallest interval
 * `[left, right]` containing it (`right − left + 1`), or -1.
 *
 * Offline: sweep queries in increasing order, adding intervals that have
 * started to a min-heap by size, and discarding those that have already
 * ended from the top.
 *
 * @see https://leetcode.com/problems/minimum-interval-to-include-each-query/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n + q log q)
 * @spaceComplexity O(n + q)
 *
 * @example
 * minimumIntervalToIncludeEachQuery([[1, 4], [2, 4], [3, 6], [4, 4]], [2, 3, 4, 5]); // [3, 3, 1, 4]
 */
export const minimumIntervalToIncludeEachQuery = (
	intervals: readonly (readonly number[])[],
	queries: readonly number[],
): number[] => {
	const sorted = intervals.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const order = queries
		.map((_, i) => i)
		.sort((i, j) => (queries[i] ?? 0) - (queries[j] ?? 0));
	const open = new Heap<[size: number, right: number]>((a, b) => a[0] - b[0]);
	const answer = new Array<number>(queries.length).fill(-1);
	let next = 0;
	for (const i of order) {
		const query = queries[i] ?? 0;
		for (; next < sorted.length && (sorted[next]?.[0] ?? 0) <= query; next++) {
			const [left = 0, right = 0] = sorted[next] ?? [];
			open.push([right - left + 1, right]);
		}
		while ((open.peek()?.[1] ?? Infinity) < query) open.pop();
		answer[i] = open.peek()?.[0] ?? -1;
	}
	return answer;
};
