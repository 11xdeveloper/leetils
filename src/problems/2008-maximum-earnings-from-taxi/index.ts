/**
 * 2008. Maximum Earnings From Taxi
 *
 * A taxi drives from point 1 to point `n`, picking up at most one
 * passenger at a time. A ride `[start, end, tip]` earns `end - start + tip`.
 * Returns the most the driver can earn.
 *
 * `best[p]` is the most earned by point `p`: either carried over from
 * `p - 1`, or a ride ending at `p` added to `best[start]`.
 *
 * @see https://leetcode.com/problems/maximum-earnings-from-taxi/
 * @difficulty Medium
 * @timeComplexity O(n + r)
 * @spaceComplexity O(n + r)
 *
 * @example
 * maximumEarningsFromTaxi(5, [[2, 5, 4], [1, 5, 1]]); // 7
 */
export const maximumEarningsFromTaxi = (
	n: number,
	rides: readonly (readonly number[])[],
): number => {
	const endingAt: (readonly number[])[][] = Array.from(
		{ length: n + 1 },
		() => [],
	);
	for (const ride of rides) endingAt[ride[1] ?? 0]?.push(ride);
	const best = new Array<number>(n + 1).fill(0);
	for (let point = 2; point <= n; point++) {
		best[point] = best[point - 1] ?? 0;
		for (const [start = 0, end = 0, tip = 0] of endingAt[point] ?? []) {
			best[point] = Math.max(
				best[point] ?? 0,
				(best[start] ?? 0) + end - start + tip,
			);
		}
	}
	return best[n] ?? 0;
};
