/**
 * 2581. Count Number of Possible Root Nodes
 *
 * Bob guesses that `u` is the parent of `v` for each `[u, v]` in
 * `guesses`. Returns how many choices of root make at least `k` of his
 * guesses right.
 *
 * Count the right guesses with node 0 as root, then move the root across
 * each edge: going from `u` to child `v` loses the guess `[u, v]` and
 * gains `[v, u]`.
 *
 * @see https://leetcode.com/problems/count-number-of-possible-root-nodes/
 * @difficulty Hard
 * @timeComplexity O(n + g)
 * @spaceComplexity O(n + g)
 *
 * @example
 * countNumberOfPossibleRootNodes([[0, 1], [1, 2], [1, 3], [4, 2]], [[1, 3], [0, 1], [1, 0], [2, 4]], 3); // 3
 */
export const countNumberOfPossibleRootNodes = (
	edges: readonly (readonly number[])[],
	guesses: readonly (readonly number[])[],
	k: number,
): number => {
	const n = edges.length + 1;
	const neighbours: number[][] = Array.from({ length: n }, () => []);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
	}
	const guessed = new Set(guesses.map(([u = 0, v = 0]) => u * n + v));

	const parent = Array.from({ length: n }, () => -1);
	const order = [0];
	let right = 0;
	for (let i = 0; i < order.length; i++) {
		const node = order[i] ?? 0;
		for (const child of neighbours[node] ?? [])
			if (child !== parent[node]) {
				parent[child] = node;
				if (guessed.has(node * n + child)) right++;
				order.push(child);
			}
	}

	const rightAt = Array.from({ length: n }, () => 0);
	rightAt[0] = right;
	let roots = 0;
	for (const node of order) {
		const up = parent[node] ?? -1;
		if (up >= 0)
			rightAt[node] =
				(rightAt[up] ?? 0) -
				(guessed.has(up * n + node) ? 1 : 0) +
				(guessed.has(node * n + up) ? 1 : 0);
		if ((rightAt[node] ?? 0) >= k) roots++;
	}
	return roots;
};
