/**
 * 1928. Minimum Cost to Reach Destination in Time
 *
 * Travelling from city 0 to city `n − 1` along edges `[x, y, time]`, each
 * city visited charges its passing fee. Returns the cheapest journey
 * taking at most `maxTime`, or -1.
 *
 * `cost[t][v]` is the cheapest way to be at `v` at exactly time `t`;
 * relax every edge for each time (times are at most 1000).
 *
 * @see https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time/
 * @difficulty Hard
 * @timeComplexity O(maxTime · (n + e))
 * @spaceComplexity O(maxTime · n)
 *
 * @example
 * minimumCostToReachDestinationInTime(30, [[0, 1, 10], [1, 2, 10], [2, 5, 10], [0, 3, 1], [3, 4, 10], [4, 5, 15]], [5, 1, 2, 20, 20, 3]); // 11
 */
export const minimumCostToReachDestinationInTime = (
	maxTime: number,
	edges: readonly (readonly number[])[],
	passingFees: readonly number[],
): number => {
	const n = passingFees.length;
	const cost = Array.from({ length: maxTime + 1 }, () =>
		new Array<number>(n).fill(Infinity),
	);
	const first = cost[0];
	if (first) first[0] = passingFees[0] ?? 0;
	for (let t = 1; t <= maxTime; t++) {
		const now = cost[t];
		if (!now) continue;
		for (const [x = 0, y = 0, time = 0] of edges) {
			if (time > t) continue;
			const before = cost[t - time];
			if (!before) continue;
			now[y] = Math.min(
				now[y] ?? Infinity,
				(before[x] ?? Infinity) + (passingFees[y] ?? 0),
			);
			now[x] = Math.min(
				now[x] ?? Infinity,
				(before[y] ?? Infinity) + (passingFees[x] ?? 0),
			);
		}
	}
	const best = Math.min(...cost.map((row) => row[n - 1] ?? Infinity));
	return best === Infinity ? -1 : best;
};
