/**
 * 3613. Minimize Maximum Component Cost
 *
 * Remove edges so that at most `k` connected components remain, where a
 * component costs its heaviest edge (0 with none). Returns the least
 * possible largest component cost.
 *
 * Kruskal: join with the lightest edges until at most k components are
 * left; the last edge used is the answer.
 *
 * @see https://leetcode.com/problems/minimize-maximum-component-cost/
 * @difficulty Medium
 * @timeComplexity O(m log m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimizeMaximumComponentCost(5, [[0, 1, 4], [1, 2, 3], [1, 3, 2], [3, 4, 6]], 2); // 4
 */
export const minimizeMaximumComponentCost = (
	n: number,
	edges: readonly (readonly number[])[],
	k: number,
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x] ?? x] ?? x;
			x = parent[x] ?? x;
		}
		return x;
	};
	let components = n;
	let cost = 0;
	for (const [u = 0, v = 0, w = 0] of [...edges].sort(
		(a, b) => (a[2] ?? 0) - (b[2] ?? 0),
	)) {
		if (components <= k) break;
		const [a, b] = [find(u), find(v)];
		if (a === b) continue;
		parent[a] = b;
		components--;
		cost = w;
	}
	return cost;
};
