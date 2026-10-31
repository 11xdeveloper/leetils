/**
 * 3243. Shortest Distance After Road Addition Queries I
 *
 * Cities 0 to n - 1 have one-way roads from each city to the next. Each
 * query adds a one-way road from u to v. Returns the shortest distance from
 * city 0 to city n - 1 after each query.
 *
 * Roads only go forwards, so after each query recompute the distances by
 * dynamic programming in city order.
 *
 * @see https://leetcode.com/problems/shortest-distance-after-road-addition-queries-i/
 * @difficulty Medium
 * @timeComplexity O(q · (n + q))
 * @spaceComplexity O(n + q)
 *
 * @example
 * shortestDistanceAfterRoadAdditionQueriesI(5, [[2, 4], [0, 2], [0, 4]]); // [3, 2, 1]
 */
export const shortestDistanceAfterRoadAdditionQueriesI = (
	n: number,
	queries: readonly (readonly number[])[],
): number[] => {
	const roads: number[][] = Array.from({ length: n }, (_, i) =>
		i + 1 < n ? [i + 1] : [],
	);
	return queries.map(([u = 0, v = 0]) => {
		roads[u]?.push(v);
		const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		distance[0] = 0;
		for (let city = 0; city < n; city++)
			for (const next of roads[city] ?? [])
				distance[next] = Math.min(
					distance[next] ?? 0,
					(distance[city] ?? 0) + 1,
				);
		return distance[n - 1] ?? 0;
	});
};
