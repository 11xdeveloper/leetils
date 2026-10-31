/**
 * 3493. Properties Graph
 *
 * Join two property lists when they share at least `k` distinct values.
 * Returns the number of connected components.
 *
 * Compare every pair of value sets and merge with union-find.
 *
 * @see https://leetcode.com/problems/properties-graph/
 * @difficulty Medium
 * @timeComplexity O(n² · m)
 * @spaceComplexity O(n · m)
 *
 * @example
 * propertiesGraph([[1, 2], [1, 1], [3, 4], [4, 5], [5, 6], [7, 7]], 1); // 3
 */
export const propertiesGraph = (
	properties: readonly (readonly number[])[],
	k: number,
): number => {
	const sets = properties.map((list) => new Set(list));
	const parent = sets.map((_, i) => i);
	const find = (x: number): number => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		parent[x] = root;
		return root;
	};
	let components = sets.length;
	for (let i = 0; i < sets.length; i++)
		for (let j = i + 1; j < sets.length; j++) {
			let shared = 0;
			for (const value of sets[i] ?? []) if (sets[j]?.has(value)) shared++;
			if (shared < k) continue;
			const [a, b] = [find(i), find(j)];
			if (a !== b) {
				parent[a] = b;
				components--;
			}
		}
	return components;
};
