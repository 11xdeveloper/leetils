/**
 * 3540. Minimum Time to Visit All Houses
 *
 * Houses 0 to n - 1 sit in a circle; going from i to i + 1 takes
 * `forward[i]` and from i to i - 1 takes `backward[i]`. Starting at 0,
 * visit the houses in `queries` in order. Returns the least total time.
 *
 * Prefix sums give the time of any arc in either direction; each step
 * takes the cheaper way round.
 *
 * @see https://leetcode.com/problems/minimum-time-to-visit-all-houses/
 * @difficulty Medium
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeToVisitAllHouses([1, 4, 4], [4, 1, 2], [1, 2, 0, 2]); // 12
 */
export const minimumTimeToVisitAllHouses = (
	forward: readonly number[],
	backward: readonly number[],
	queries: readonly number[],
): number => {
	const n = forward.length;
	// ahead[i]: time from 0 forwards to i; back[i]: time from i backwards to 0.
	const ahead = [0];
	for (let i = 0; i < n; i++)
		ahead.push((ahead.at(-1) ?? 0) + (forward[i] ?? 0));
	const back = [0];
	for (let i = 1; i <= n; i++)
		back.push((back.at(-1) ?? 0) + (backward[i % n] ?? 0));
	const forwardTime = (from: number, to: number): number =>
		to >= from
			? (ahead[to] ?? 0) - (ahead[from] ?? 0)
			: (ahead[n] ?? 0) - (ahead[from] ?? 0) + (ahead[to] ?? 0);
	const backTime = (from: number, to: number): number =>
		from >= to
			? (back[from] ?? 0) - (back[to] ?? 0)
			: (back[from] ?? 0) + (back[n] ?? 0) - (back[to] ?? 0);
	let total = 0;
	let at = 0;
	for (const target of queries) {
		total += Math.min(forwardTime(at, target), backTime(at, target));
		at = target;
	}
	return total;
};
