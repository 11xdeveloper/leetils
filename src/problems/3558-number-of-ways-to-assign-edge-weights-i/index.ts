const MOD = 1_000_000_007;

/**
 * 3558. Number of Ways to Assign Edge Weights I
 *
 * In a tree rooted at node 1, take a deepest node x and give each edge on
 * the path from 1 to x a weight of 1 or 2. Returns how many choices make
 * the path's cost odd, modulo 10⁹ + 7.
 *
 * With d edges, half of the 2^d choices are odd, so 2^(d - 1). Find the
 * depth with a breadth-first search.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-assign-edge-weights-i/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * numberOfWaysToAssignEdgeWeightsI([[1, 2], [1, 3], [3, 4], [3, 5]]); // 2
 */
export const numberOfWaysToAssignEdgeWeightsI = (
	edges: readonly (readonly number[])[],
): number => {
	const n = edges.length + 1;
	const adjacent: number[][] = Array.from({ length: n + 1 }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const depth = new Int32Array(n + 1).fill(-1);
	depth[1] = 0;
	const queue = [1];
	let deepest = 0;
	for (let i = 0; i < queue.length; i++) {
		const node = queue[i] ?? 1;
		deepest = Math.max(deepest, depth[node] ?? 0);
		for (const next of adjacent[node] ?? [])
			if (depth[next] === -1) {
				depth[next] = (depth[node] ?? 0) + 1;
				queue.push(next);
			}
	}
	let ways = 1;
	for (let i = 1; i < deepest; i++) ways = (ways * 2) % MOD;
	return ways;
};
