/**
 * 310. Minimum Height Trees
 *
 * Given a tree with nodes 0 to `n - 1`, returns every node that, chosen as
 * the root, gives the tree its smallest possible height. There are always
 * one or two.
 *
 * The best roots are the centre of the tree's longest path. Removing all
 * the leaves repeatedly, layer by layer, peels the tree towards that centre,
 * and the last one or two nodes left are the answer.
 *
 * @see https://leetcode.com/problems/minimum-height-trees/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumHeightTrees(6, [[3, 0], [3, 1], [3, 2], [3, 4], [5, 4]]); // [3, 4]
 */
export const minimumHeightTrees = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	if (n <= 2) return Array.from({ length: n }, (_, i) => i);

	const neighbours: number[][] = Array.from({ length: n }, () => []);
	const degree = new Array<number>(n).fill(0);
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.push(b);
		neighbours[b]?.push(a);
		degree[a] = (degree[a] ?? 0) + 1;
		degree[b] = (degree[b] ?? 0) + 1;
	}

	let leaves = degree.flatMap((d, node) => (d === 1 ? [node] : []));
	let remaining = n;
	while (remaining > 2) {
		remaining -= leaves.length;
		const next: number[] = [];
		for (const leaf of leaves) {
			for (const neighbour of neighbours[leaf] ?? []) {
				degree[neighbour] = (degree[neighbour] ?? 0) - 1;
				if (degree[neighbour] === 1) next.push(neighbour);
			}
		}
		leaves = next;
	}

	return leaves;
};
