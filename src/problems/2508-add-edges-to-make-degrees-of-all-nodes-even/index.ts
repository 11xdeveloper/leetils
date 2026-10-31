/**
 * 2508. Add Edges to Make Degrees of All Nodes Even
 *
 * Returns whether adding at most two new edges, with no repeats or
 * self-loops, can give every node of the graph an even degree.
 *
 * Only the odd nodes matter. With none, it already works. With two, join
 * them directly or both to a third node joined to neither. With four,
 * try the three ways to pair them. Any other count is impossible.
 *
 * @see https://leetcode.com/problems/add-edges-to-make-degrees-of-all-nodes-even/
 * @difficulty Hard
 * @timeComplexity O(n + e)
 * @spaceComplexity O(n + e)
 *
 * @example
 * addEdgesToMakeDegreesOfAllNodesEven(4, [[1, 2], [1, 3], [1, 4]]); // false
 */
export const addEdgesToMakeDegreesOfAllNodesEven = (
	n: number,
	edges: readonly (readonly number[])[],
): boolean => {
	const neighbours = Array.from({ length: n + 1 }, () => new Set<number>());
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.add(b);
		neighbours[b]?.add(a);
	}
	const joined = (a: number, b: number): boolean =>
		neighbours[a]?.has(b) ?? false;

	const odd: number[] = [];
	for (let node = 1; node <= n; node++)
		if ((neighbours[node]?.size ?? 0) % 2 === 1) odd.push(node);

	const [a = 0, b = 0, c = 0, d = 0] = odd;
	if (odd.length === 0) return true;
	if (odd.length === 2) {
		if (!joined(a, b)) return true;
		for (let other = 1; other <= n; other++)
			if (other !== a && other !== b && !joined(other, a) && !joined(other, b))
				return true;
		return false;
	}
	if (odd.length === 4)
		return (
			(!joined(a, b) && !joined(c, d)) ||
			(!joined(a, c) && !joined(b, d)) ||
			(!joined(a, d) && !joined(b, c))
		);
	return false;
};
