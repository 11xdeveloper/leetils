/**
 * 3786. Total Sum of Interaction Cost in Tree Groups
 *
 * Each node of a tree belongs to `group[i]`. Two nodes of the same group
 * interact at the cost of their distance. Returns the total over all such
 * pairs.
 *
 * Each edge is crossed by every same-group pair split by it, so for every
 * edge and group multiply the group's count below the edge by the count
 * above.
 *
 * @see https://leetcode.com/problems/total-sum-of-interaction-cost-in-tree-groups/
 * @difficulty Hard
 * @timeComplexity O(n · g), for g groups
 * @spaceComplexity O(n · g)
 *
 * @example
 * totalSumOfInteractionCostInTreeGroups(3, [[0, 1], [1, 2]], [1, 1, 1]); // 4
 */
export const totalSumOfInteractionCostInTreeGroups = (
	n: number,
	edges: readonly (readonly number[])[],
	group: readonly number[],
): number => {
	const labels = [...new Set(group)];
	const id = new Map(labels.map((label, i) => [label, i]));
	const g = labels.length;
	const totals = new Array<number>(g).fill(0);
	for (const label of group)
		totals[id.get(label) ?? 0] = (totals[id.get(label) ?? 0] ?? 0) + 1;
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const parent = new Int32Array(n).fill(-1);
	const order = [0];
	for (let i = 0; i < order.length; i++) {
		const v = order[i] ?? 0;
		for (const to of adjacent[v] ?? [])
			if (to !== parent[v] && to !== 0) {
				parent[to] = v;
				order.push(to);
			}
	}
	const below = new Float64Array(n * g);
	group.forEach((label, v) => {
		below[v * g + (id.get(label) ?? 0)] = 1;
	});
	let cost = 0;
	for (let i = n - 1; i > 0; i--) {
		const v = order[i] ?? 0;
		const p = parent[v] ?? 0;
		for (let c = 0; c < g; c++) {
			const count = below[v * g + c] ?? 0;
			cost += count * ((totals[c] ?? 0) - count);
			below[p * g + c] = (below[p * g + c] ?? 0) + count;
		}
	}
	return cost;
};
