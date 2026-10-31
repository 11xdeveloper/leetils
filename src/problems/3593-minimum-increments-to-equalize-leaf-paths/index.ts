/**
 * 3593. Minimum Increments to Equalize Leaf Paths
 *
 * Increase the costs of some nodes of a tree rooted at 0 so every path
 * from the root to a leaf has the same total. Returns the fewest nodes
 * that need increasing.
 *
 * Bottom-up, each subtree's paths should all reach its heaviest path; any
 * child whose subtree falls short gets one increase, at the child itself.
 *
 * @see https://leetcode.com/problems/minimum-increments-to-equalize-leaf-paths/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumIncrementsToEqualizeLeafPaths(3, [[0, 1], [0, 2]], [2, 1, 3]); // 1
 */
export const minimumIncrementsToEqualizeLeafPaths = (
	n: number,
	edges: readonly (readonly number[])[],
	cost: readonly number[],
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const v = order[i] ?? 0;
		for (const to of adjacent[v] ?? [])
			if (to !== parent[v]) {
				parent[to] = v;
				order.push(to);
			}
	}
	const heaviest = new Float64Array(n);
	let increases = 0;
	for (let i = n - 1; i >= 0; i--) {
		const v = order[i] ?? 0;
		let most = 0;
		const kids = (adjacent[v] ?? []).filter((to) => to !== parent[v]);
		for (const child of kids) most = Math.max(most, heaviest[child] ?? 0);
		for (const child of kids) if ((heaviest[child] ?? 0) < most) increases++;
		heaviest[v] = (cost[v] ?? 0) + most;
	}
	return increases;
};
