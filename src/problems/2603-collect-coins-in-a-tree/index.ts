/**
 * 2603. Collect Coins in a Tree
 *
 * Some nodes of a tree hold coins. From a start of your choice, you
 * collect every coin within distance 2 of where you stand, and must end
 * back at the start. Returns the fewest edges to traverse.
 *
 * Repeatedly prune leaves without coins, which are never worth visiting;
 * then prune two more layers of leaves, since coins that close are
 * collected from further in. Every remaining edge is walked twice.
 *
 * @see https://leetcode.com/problems/collect-coins-in-a-tree/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * collectCoinsInATree([1, 0, 0, 0, 0, 1], [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]]); // 2
 */
export const collectCoinsInATree = (
	coins: readonly number[],
	edges: readonly (readonly number[])[],
): number => {
	const n = coins.length;
	const neighbours = Array.from({ length: n }, () => new Set<number>());
	for (const [a = 0, b = 0] of edges) {
		neighbours[a]?.add(b);
		neighbours[b]?.add(a);
	}
	let remaining = n - 1;
	const removeLeaf = (leaf: number): number | undefined => {
		const [next] = neighbours[leaf] ?? [];
		if (next === undefined) return undefined;
		neighbours[leaf]?.clear();
		neighbours[next]?.delete(leaf);
		remaining--;
		return next;
	};

	const bare: number[] = [];
	for (let node = 0; node < n; node++)
		if (neighbours[node]?.size === 1 && coins[node] === 0) bare.push(node);
	for (let leaf = bare.pop(); leaf !== undefined; leaf = bare.pop()) {
		const next = removeLeaf(leaf);
		if (next !== undefined && neighbours[next]?.size === 1 && coins[next] === 0)
			bare.push(next);
	}

	for (let layer = 0; layer < 2; layer++) {
		const leaves: number[] = [];
		for (let node = 0; node < n; node++)
			if (neighbours[node]?.size === 1) leaves.push(node);
		for (const leaf of leaves) removeLeaf(leaf);
	}
	return 2 * Math.max(0, remaining);
};
