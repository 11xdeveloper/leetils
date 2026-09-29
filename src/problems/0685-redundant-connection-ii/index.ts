/**
 * 685. Redundant Connection II
 *
 * A rooted tree (edges pointing from parent to child) over nodes 1 to `n`
 * had one extra directed edge added. Returns an edge whose removal leaves a
 * rooted tree, the one appearing last in `edges` if there are several.
 *
 * The extra edge either gives some node two parents, or creates a cycle
 * through the root, or both. If a node has two parents, one of those two
 * edges must go: the later one, unless leaving it in (and skipping the
 * later one) still leaves a cycle, in which case the earlier. Otherwise the
 * edge that closes the cycle, found with union–find, goes.
 *
 * @see https://leetcode.com/problems/redundant-connection-ii/
 * @difficulty Hard
 * @timeComplexity O(n · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * redundantConnectionII([[1, 2], [2, 3], [3, 4], [4, 1], [1, 5]]); // [4, 1]
 */
export const redundantConnectionII = (
	edges: readonly (readonly number[])[],
): number[] => {
	const n = edges.length;
	const parentOf = new Array<number>(n + 1).fill(0);
	let first: readonly number[] | undefined;
	let second: readonly number[] | undefined;
	for (const edge of edges) {
		const [from = 0, to = 0] = edge;
		const existing = parentOf[to] ?? 0;
		if (existing !== 0) {
			first = [existing, to];
			second = edge;
		} else {
			parentOf[to] = from;
		}
	}

	const root = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (node: number): number => {
		while (root[node] !== node) {
			const grandparent = root[root[node] ?? node] ?? node;
			root[node] = grandparent;
			node = grandparent;
		}
		return node;
	};

	for (const edge of edges) {
		if (edge === second) continue;
		const [from = 0, to = 0] = edge;
		const a = find(from);
		const b = find(to);
		if (a === b) return first ? [...first] : [from, to];
		root[b] = a;
	}

	return second ? [...second] : [];
};
