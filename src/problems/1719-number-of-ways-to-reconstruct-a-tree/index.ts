/**
 * 1719. Number Of Ways To Reconstruct A Tree
 *
 * Counts the rooted trees on the values in `pairs` where two nodes form a
 * pair exactly when one is an ancestor of the other. Returns 0, 1, or 2
 * for "more than one".
 *
 * A node is related to all its ancestors and descendants, so ancestors are
 * related to at least as many nodes. Taking nodes by decreasing count,
 * the first must be related to everyone (the root), and each later node's
 * parent is the latest earlier node it's related to. Every relation of the
 * node must also be a relation of that parent. A parent with the same
 * count could swap places with the child, giving several trees.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-reconstruct-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n log n + m) for m pairs
 * @spaceComplexity O(n + m)
 *
 * @example
 * numberOfWaysToReconstructATree([[1, 2], [2, 3], [1, 3]]); // 2
 */
export const numberOfWaysToReconstructATree = (
	pairs: readonly (readonly number[])[],
): number => {
	const related = new Map<number, Set<number>>();
	for (const [x = 0, y = 0] of pairs) {
		related.set(x, (related.get(x) ?? new Set()).add(y));
		related.set(y, (related.get(y) ?? new Set()).add(x));
	}
	const degree = (node: number) => related.get(node)?.size ?? 0;
	const order = [...related.keys()].sort((a, b) => degree(b) - degree(a));
	if (degree(order[0] ?? 0) !== order.length - 1) return 0;
	const position = new Map(order.map((node, i) => [node, i]));
	let ways = 1;
	for (const [i, node] of order.entries()) {
		if (i === 0) continue;
		const neighbours = related.get(node) ?? new Set<number>();
		// The parent is the latest node before this one in the order that it's related to.
		let parent: number | undefined;
		for (const other of neighbours) {
			const at = position.get(other) ?? Infinity;
			if (at < i && (parent === undefined || at > (position.get(parent) ?? 0)))
				parent = other;
		}
		if (parent === undefined) return 0;
		const parentRelated = related.get(parent) ?? new Set<number>();
		for (const other of neighbours)
			if (other !== parent && !parentRelated.has(other)) return 0;
		if (degree(parent) === degree(node)) ways = 2;
	}
	return ways;
};
