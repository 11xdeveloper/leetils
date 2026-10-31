/**
 * 3585. Find Weighted Median Node in Tree
 *
 * For each query `[u, v]` in a weighted tree, walk the path from u to v
 * and return the first node whose distance from u is at least half the
 * path's length.
 *
 * Root the tree, recording depths by weight and binary-lifting ancestors.
 * If the median lies on u's way up to the lowest common ancestor, it's
 * just above the highest ancestor of u still short of half; otherwise it's
 * the highest ancestor of v within half the length of v.
 *
 * @see https://leetcode.com/problems/find-weighted-median-node-in-tree/
 * @difficulty Hard
 * @timeComplexity O((n + q) log n)
 * @spaceComplexity O(n log n)
 *
 * @example
 * findWeightedMedianNodeInTree(2, [[0, 1, 7]], [[1, 0], [0, 1]]); // [0, 1]
 */
export const findWeightedMedianNodeInTree = (
	n: number,
	edges: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): number[] => {
	const adjacent: [to: number, weight: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	for (const [u = 0, v = 0, w = 0] of edges) {
		adjacent[u]?.push([v, w]);
		adjacent[v]?.push([u, w]);
	}
	let levels = 1;
	while (1 << levels < n) levels++;
	const up: Int32Array[] = Array.from(
		{ length: levels },
		() => new Int32Array(n),
	);
	const depth = new Int32Array(n);
	const distance = new Float64Array(n);
	const seen = new Uint8Array(n);
	const stack = [0];
	seen[0] = 1;
	while (stack.length > 0) {
		const v = stack.pop() ?? 0;
		for (const [to, weight] of adjacent[v] ?? []) {
			if (seen[to]) continue;
			seen[to] = 1;
			(up[0] as Int32Array)[to] = v;
			depth[to] = (depth[v] ?? 0) + 1;
			distance[to] = (distance[v] ?? 0) + weight;
			stack.push(to);
		}
	}
	for (let level = 1; level < levels; level++)
		for (let v = 0; v < n; v++)
			(up[level] as Int32Array)[v] =
				up[level - 1]?.[up[level - 1]?.[v] ?? 0] ?? 0;
	const lca = (a: number, b: number): number => {
		let [x, y] = (depth[a] ?? 0) >= (depth[b] ?? 0) ? [a, b] : [b, a];
		for (let level = levels - 1; level >= 0; level--)
			if ((depth[x] ?? 0) - (1 << level) >= (depth[y] ?? 0))
				x = up[level]?.[x] ?? 0;
		if (x === y) return x;
		for (let level = levels - 1; level >= 0; level--)
			if (up[level]?.[x] !== up[level]?.[y])
				[x, y] = [up[level]?.[x] ?? 0, up[level]?.[y] ?? 0];
		return up[0]?.[x] ?? 0;
	};
	return queries.map(([u = 0, v = 0]) => {
		if (u === v) return u;
		const top = lca(u, v);
		const total =
			(distance[u] ?? 0) + (distance[v] ?? 0) - 2 * (distance[top] ?? 0);
		const fromU = (x: number) => (distance[u] ?? 0) - (distance[x] ?? 0);
		if (2 * fromU(top) >= total) {
			// Climb while still short of half, then step once more.
			let x = u;
			for (let level = levels - 1; level >= 0; level--) {
				const ancestor = up[level]?.[x] ?? 0;
				if (
					(depth[ancestor] ?? 0) >= (depth[top] ?? 0) &&
					2 * fromU(ancestor) < total
				)
					x = ancestor;
			}
			return up[0]?.[x] ?? 0;
		}
		const fromV = (x: number) => (distance[v] ?? 0) - (distance[x] ?? 0);
		let x = v;
		for (let level = levels - 1; level >= 0; level--) {
			const ancestor = up[level]?.[x] ?? 0;
			if (
				(depth[ancestor] ?? 0) > (depth[top] ?? 0) &&
				2 * fromV(ancestor) <= total
			)
				x = ancestor;
		}
		return x;
	});
};
