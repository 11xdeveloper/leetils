/**
 * 3244. Shortest Distance After Road Addition Queries II
 *
 * Cities 0 to n - 1 have one-way roads from each city to the next. Each
 * query adds a one-way road from u to v, and no two added roads cross.
 * Returns the shortest distance from city 0 to city n - 1 after each query.
 *
 * Without crossings, the shortest route just skips the cities under each
 * outermost road. Keep each city's next stop, and when a road skips cities
 * still on the route, unlink them; every city is unlinked at most once.
 *
 * @see https://leetcode.com/problems/shortest-distance-after-road-addition-queries-ii/
 * @difficulty Hard
 * @timeComplexity O(n + q)
 * @spaceComplexity O(n)
 *
 * @example
 * shortestDistanceAfterRoadAdditionQueriesII(5, [[2, 4], [0, 2], [0, 4]]); // [3, 2, 1]
 */
export const shortestDistanceAfterRoadAdditionQueriesII = (
	n: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const next = Int32Array.from({ length: n }, (_, i) => i + 1);
	let length = n - 1;
	return queries.map(([u = 0, v = 0]) => {
		if ((next[u] ?? 0) < v) {
			for (let city = next[u] ?? 0; city < v; ) {
				const after = next[city] ?? 0;
				next[city] = v;
				length--;
				city = after;
			}
			next[u] = v;
		}
		return length;
	});
};
