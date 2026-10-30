/**
 * 2277. Closest Node to Path in Tree
 *
 * For each query `[start, end, node]` on a tree, returns the node on the
 * path from `start` to `end` closest to `node`.
 *
 * Precompute all distances with a breadth-first search from every node.
 * A node `x` is on the path when `d(start, x) + d(x, end) = d(start, end)`.
 *
 * @see https://leetcode.com/problems/closest-node-to-path-in-tree/
 * @difficulty Hard
 * @timeComplexity O(n^2 + q · n)
 * @spaceComplexity O(n^2)
 *
 * @example
 * closestNodeToPathInTree(3, [[0, 1], [1, 2]], [[0, 1, 2]]); // [1]
 */
export const closestNodeToPathInTree = (
	n: number,
	edges: readonly (readonly number[])[],
	query: readonly (readonly number[])[],
): number[] => {
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const distance = Array.from({ length: n }, (_, source) => {
		const d = new Array<number>(n).fill(-1);
		d[source] = 0;
		const queue = [source];
		for (let head = 0; head < queue.length; head++) {
			const node = queue[head] ?? 0;
			for (const next of neighbours[node] ?? []) {
				if (d[next] !== -1) continue;
				d[next] = (d[node] ?? 0) + 1;
				queue.push(next);
			}
		}
		return d;
	});
	return query.map(([start = 0, end = 0, node = 0]) => {
		const fromStart = distance[start] ?? [];
		const fromEnd = distance[end] ?? [];
		const fromNode = distance[node] ?? [];
		const length = fromStart[end] ?? 0;
		let [best, closest] = [Infinity, start];
		for (let x = 0; x < n; x++) {
			if ((fromStart[x] ?? 0) + (fromEnd[x] ?? 0) !== length) continue;
			if ((fromNode[x] ?? 0) < best) [best, closest] = [fromNode[x] ?? 0, x];
		}
		return closest;
	});
};
