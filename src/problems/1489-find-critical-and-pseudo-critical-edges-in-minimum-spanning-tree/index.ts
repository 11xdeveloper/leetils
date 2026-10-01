/**
 * 1489. Find Critical and Pseudo-Critical Edges in Minimum Spanning Tree
 *
 * Returns `[critical, pseudoCritical]`: the indices of edges in every
 * minimum spanning tree, and of those in some but not all.
 *
 * Runs Kruskal's algorithm for the minimum weight, then again for each
 * edge: without it (an edge is critical if the weight rises or the graph
 * splits), and with it forced in first (a non-critical edge is
 * pseudo-critical if the weight stays the same).
 *
 * @see https://leetcode.com/problems/find-critical-and-pseudo-critical-edges-in-minimum-spanning-tree/
 * @difficulty Hard
 * @timeComplexity O(e^2 · α(n))
 * @spaceComplexity O(n + e)
 *
 * @example
 * findCriticalAndPseudoCriticalEdgesInMinimumSpanningTree(4, [[0, 1, 1], [1, 2, 1], [2, 3, 1], [0, 3, 1]]); // [[], [0, 1, 2, 3]]
 */
export const findCriticalAndPseudoCriticalEdgesInMinimumSpanningTree = (
	n: number,
	edges: readonly (readonly number[])[],
): number[][] => {
	const order = edges
		.map((_, i) => i)
		.sort((a, b) => (edges[a]?.[2] ?? 0) - (edges[b]?.[2] ?? 0));
	const mst = (skip: number, force: number): number => {
		const parent = Array.from({ length: n }, (_, i) => i);
		const find = (x: number): number => {
			while (parent[x] !== x) {
				const grandparent = parent[parent[x] ?? x] ?? x;
				parent[x] = grandparent;
				x = grandparent;
			}
			return x;
		};
		let [weight, joined] = [0, 0];
		const add = (i: number) => {
			const [a = 0, b = 0, w = 0] = edges[i] ?? [];
			const [rootA, rootB] = [find(a), find(b)];
			if (rootA === rootB) return;
			parent[rootA] = rootB;
			weight += w;
			joined++;
		};
		if (force !== -1) add(force);
		for (const i of order) if (i !== skip) add(i);
		return joined === n - 1 ? weight : Infinity;
	};
	const best = mst(-1, -1);
	const critical: number[] = [];
	const pseudoCritical: number[] = [];
	edges.forEach((_, i) => {
		if (mst(i, -1) > best) critical.push(i);
		else if (mst(-1, i) === best) pseudoCritical.push(i);
	});
	return [critical, pseudoCritical];
};
