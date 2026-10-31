type Best = [distance: number, i: number, j: number];

/**
 * 2613. Beautiful Pairs
 *
 * Point `i` is `(nums1[i], nums2[i])`. Returns the pair of indices
 * `[i, j]`, `i < j`, at the smallest Manhattan distance, choosing the
 * lexicographically smallest on ties.
 *
 * If any point repeats, the answer is the earliest pair of equal points.
 * Otherwise use divide-and-conquer closest pair: split by `x`, solve each
 * half, then check points near the dividing line in order of `y`; with
 * distinct points only a few neighbours can be close enough.
 *
 * @see https://leetcode.com/problems/beautiful-pairs/
 * @difficulty Hard
 * @timeComplexity O(n log² n)
 * @spaceComplexity O(n)
 *
 * @example
 * beautifulPairs([1, 2, 3, 2, 4], [2, 3, 1, 2, 3]); // [0, 3]
 */
export const beautifulPairs = (
	nums1: readonly number[],
	nums2: readonly number[],
): number[] => {
	const n = nums1.length;
	const x = (i: number): number => nums1[i] ?? 0;
	const y = (i: number): number => nums2[i] ?? 0;
	const better = (a: Best, b: Best): boolean =>
		a[0] < b[0] ||
		(a[0] === b[0] && (a[1] < b[1] || (a[1] === b[1] && a[2] < b[2])));
	const pairOf = (a: number, b: number): Best => [
		Math.abs(x(a) - x(b)) + Math.abs(y(a) - y(b)),
		Math.min(a, b),
		Math.max(a, b),
	];

	const firstAt = new Map<string, number>();
	let best: Best = [Number.POSITIVE_INFINITY, n, n];
	for (let i = 0; i < n; i++) {
		const key = `${x(i)},${y(i)}`;
		const earlier = firstAt.get(key);
		if (earlier === undefined) firstAt.set(key, i);
		else if (better([0, earlier, i], best)) best = [0, earlier, i];
	}
	if (best[0] === 0) return [best[1], best[2]];

	const byX = [...Array(n).keys()].sort((a, b) => x(a) - x(b) || y(a) - y(b));
	// Sorts byX[low, high) by y as a side effect, merge-sort style.
	const solve = (low: number, high: number): void => {
		if (high - low <= 1) return;
		const mid = (low + high) >> 1;
		const midX = x(byX[mid] ?? 0);
		solve(low, mid);
		solve(mid, high);
		const merged = [...byX.slice(low, mid), ...byX.slice(mid, high)].sort(
			(a, b) => y(a) - y(b),
		);
		byX.splice(low, high - low, ...merged);

		const strip = merged.filter((i) => Math.abs(x(i) - midX) <= best[0]);
		for (let a = 0; a < strip.length; a++)
			for (let b = a + 1; b < strip.length; b++) {
				const i = strip[a] ?? 0;
				const j = strip[b] ?? 0;
				if (y(j) - y(i) > best[0]) break;
				const candidate = pairOf(i, j);
				if (better(candidate, best)) best = candidate;
			}
	};
	solve(0, n);
	return [best[1], best[2]];
};
