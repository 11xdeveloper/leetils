/**
 * 1857. Largest Color Value in a Directed Graph
 *
 * Node `i` has colour `colors[i]`. A path's colour value is the count of
 * its most frequent colour. Returns the largest colour value of any path,
 * or -1 if the graph has a cycle.
 *
 * Kahn's topological sort, carrying for each node the most of each colour
 * on a path ending there; if some node never comes out, there is a cycle.
 *
 * @see https://leetcode.com/problems/largest-color-value-in-a-directed-graph/
 * @difficulty Hard
 * @timeComplexity O(26 · (n + e))
 * @spaceComplexity O(26 · n + e)
 *
 * @example
 * largestColorValueInADirectedGraph("abaca", [[0, 1], [0, 2], [2, 3], [3, 4]]); // 3
 */
export const largestColorValueInADirectedGraph = (
	colors: string,
	edges: readonly (readonly number[])[],
): number => {
	const n = colors.length;
	const out: number[][] = Array.from({ length: n }, () => []);
	const indegree = new Array<number>(n).fill(0);
	for (const [u = 0, v = 0] of edges) {
		out[u]?.push(v);
		indegree[v] = (indegree[v] ?? 0) + 1;
	}
	const most = Array.from({ length: n }, () => new Array<number>(26).fill(0));
	const queue: number[] = [];
	for (let node = 0; node < n; node++)
		if (indegree[node] === 0) queue.push(node);
	let best = 0;
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head] ?? 0;
		const counts = most[node] ?? [];
		const color = colors.charCodeAt(node) - 97;
		counts[color] = (counts[color] ?? 0) + 1;
		best = Math.max(best, counts[color] ?? 0);
		for (const next of out[node] ?? []) {
			const nextCounts = most[next] ?? [];
			for (let c = 0; c < 26; c++)
				nextCounts[c] = Math.max(nextCounts[c] ?? 0, counts[c] ?? 0);
			indegree[next] = (indegree[next] ?? 0) - 1;
			if (indegree[next] === 0) queue.push(next);
		}
	}
	return queue.length === n ? best : -1;
};
