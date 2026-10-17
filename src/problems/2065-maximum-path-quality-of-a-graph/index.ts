/**
 * 2065. Maximum Path Quality of a Graph
 *
 * A valid path starts and ends at node 0 within `maxTime`, where each
 * edge `[u, v, time]` takes `time`. Its quality is the sum of the values
 * of the distinct nodes visited. Returns the best quality.
 *
 * Edges take at least 10 and `maxTime` is at most 100, so paths have at
 * most 10 edges, and each node has at most 4 edges: backtrack over every
 * path, counting a node's value on its first visit.
 *
 * @see https://leetcode.com/problems/maximum-path-quality-of-a-graph/
 * @difficulty Hard
 * @timeComplexity O(4^10)
 * @spaceComplexity O(n + e)
 *
 * @example
 * maximumPathQualityOfAGraph([0, 32, 10, 43], [[0, 1, 10], [1, 2, 15], [0, 3, 10]], 49); // 75
 */
export const maximumPathQualityOfAGraph = (
	values: readonly number[],
	edges: readonly (readonly number[])[],
	maxTime: number,
): number => {
	const neighbours: [node: number, time: number][][] = values.map(() => []);
	for (const [u = 0, v = 0, time = 0] of edges) {
		neighbours[u]?.push([v, time]);
		neighbours[v]?.push([u, time]);
	}
	const visits = values.map(() => 0);
	let best = 0;
	const walk = (node: number, timeLeft: number, quality: number): void => {
		if (node === 0) best = Math.max(best, quality);
		for (const [next, time] of neighbours[node] ?? []) {
			if (time > timeLeft) continue;
			const firstVisit = visits[next] === 0;
			visits[next] = (visits[next] ?? 0) + 1;
			walk(
				next,
				timeLeft - time,
				quality + (firstVisit ? (values[next] ?? 0) : 0),
			);
			visits[next] = (visits[next] ?? 0) - 1;
		}
	};
	visits[0] = 1;
	walk(0, maxTime, values[0] ?? 0);
	return best;
};
