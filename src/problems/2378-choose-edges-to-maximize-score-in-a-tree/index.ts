/**
 * 2378. Choose Edges to Maximize Score in a Tree
 *
 * Node `i` hangs from `edges[i][0]` by an edge of weight `edges[i][1]`
 * (node 0 is the root). Chooses edges, no two sharing a node, to maximise
 * the total weight.
 *
 * Children first, track each node's best subtree score when it is free to
 * use an edge to a child, and when it isn't. Using the edge to child `c`
 * swaps `c`'s free score for its unused one plus the weight.
 *
 * @see https://leetcode.com/problems/choose-edges-to-maximize-score-in-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * chooseEdgesToMaximizeScoreInATree([[-1, -1], [0, 5], [0, 10], [2, 6], [2, 4]]); // 11
 */
export const chooseEdgesToMaximizeScoreInATree = (
	edges: readonly (readonly number[])[],
): number => {
	const n = edges.length;
	const children: number[][] = Array.from({ length: n }, () => []);
	for (let node = 1; node < n; node++)
		children[edges[node]?.[0] ?? 0]?.push(node);
	const order = [0];
	for (let head = 0; head < order.length; head++)
		order.push(...(children[order[head] ?? 0] ?? []));

	const free = new Array<number>(n).fill(0);
	const unused = new Array<number>(n).fill(0);
	for (const node of order.toReversed()) {
		let base = 0;
		for (const child of children[node] ?? []) base += free[child] ?? 0;
		let best = base;
		for (const child of children[node] ?? [])
			best = Math.max(
				best,
				base -
					(free[child] ?? 0) +
					(unused[child] ?? 0) +
					(edges[child]?.[1] ?? 0),
			);
		unused[node] = base;
		free[node] = best;
	}
	return free[0] ?? 0;
};
