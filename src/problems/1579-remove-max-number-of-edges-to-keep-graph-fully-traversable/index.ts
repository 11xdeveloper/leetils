/**
 * 1579. Remove Max Number of Edges to Keep Graph Fully Traversable
 *
 * Edges are usable by Alice (type 1), Bob (type 2) or both (type 3).
 * Returns the most edges that can be removed while both can still reach
 * every node, or -1 if they can't already.
 *
 * Shared edges are the most valuable, so add them first to both players'
 * union–finds, then each player's own edges. Every edge that joins nothing
 * new is removable.
 *
 * @see https://leetcode.com/problems/remove-max-number-of-edges-to-keep-graph-fully-traversable/
 * @difficulty Hard
 * @timeComplexity O(n + e · α(n))
 * @spaceComplexity O(n)
 *
 * @example
 * removeMaxNumberOfEdgesToKeepGraphFullyTraversable(4, [[3, 1, 2], [3, 2, 3], [1, 1, 3], [1, 2, 4], [1, 1, 2], [2, 3, 4]]); // 2
 */
export const removeMaxNumberOfEdgesToKeepGraphFullyTraversable = (
	n: number,
	edges: readonly (readonly number[])[],
): number => {
	const makeSets = () => {
		const parent = Array.from({ length: n + 1 }, (_, i) => i);
		let groups = n;
		const find = (x: number): number => {
			while (parent[x] !== x) {
				const grandparent = parent[parent[x] ?? x] ?? x;
				parent[x] = grandparent;
				x = grandparent;
			}
			return x;
		};
		const union = (a: number, b: number) => {
			const [rootA, rootB] = [find(a), find(b)];
			if (rootA === rootB) return false;
			parent[rootA] = rootB;
			groups--;
			return true;
		};
		return { union, connected: () => groups === 1 };
	};
	const [alice, bob] = [makeSets(), makeSets()];
	let used = 0;
	for (const type of [3, 1, 2]) {
		for (const [t, a = 0, b = 0] of edges) {
			if (t !== type) continue;
			const forAlice = type !== 2 && alice.union(a, b);
			const forBob = type !== 1 && bob.union(a, b);
			if (forAlice || forBob) used++;
		}
	}
	return alice.connected() && bob.connected() ? edges.length - used : -1;
};
