/**
 * 1751. Maximum Number of Events That Can Be Attended II
 *
 * Each event `[start, end, value]` occupies whole days `start … end`.
 * Attending at most `k` non-overlapping events, returns the largest total
 * value.
 *
 * Sort by end day. `best[j][i]` is the most value from `j` events among
 * the first `i`; taking event `i` adds its value to the best among events
 * ending before it starts, found by binary search.
 *
 * @see https://leetcode.com/problems/maximum-number-of-events-that-can-be-attended-ii/
 * @difficulty Hard
 * @timeComplexity O(n log n + n · k)
 * @spaceComplexity O(n · k)
 *
 * @example
 * maximumNumberOfEventsThatCanBeAttendedII([[1, 2, 4], [3, 4, 3], [2, 3, 10]], 2); // 10
 */
export const maximumNumberOfEventsThatCanBeAttendedII = (
	events: readonly (readonly number[])[],
	k: number,
): number => {
	const sorted = events.toSorted((a, b) => (a[1] ?? 0) - (b[1] ?? 0));
	const n = sorted.length;
	// previous[i]: how many events end strictly before event i starts.
	const previous = sorted.map(([start = 0]) => {
		let [low, high] = [0, n];
		while (low < high) {
			const mid = (low + high) >>> 1;
			if ((sorted[mid]?.[1] ?? 0) < start) low = mid + 1;
			else high = mid;
		}
		return low;
	});
	let best = new Array<number>(n + 1).fill(0);
	for (let taken = 1; taken <= k; taken++) {
		const next = new Array<number>(n + 1).fill(0);
		for (let i = 1; i <= n; i++) {
			const value = sorted[i - 1]?.[2] ?? 0;
			next[i] = Math.max(
				next[i - 1] ?? 0,
				(best[previous[i - 1] ?? 0] ?? 0) + value,
			);
		}
		best = next;
	}
	return best[n] ?? 0;
};
