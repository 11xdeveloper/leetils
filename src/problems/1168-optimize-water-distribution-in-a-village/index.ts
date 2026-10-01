/**
 * 1168. Optimize Water Distribution in a Village
 *
 * Each of the houses `1 … n` gets water from a well of its own (costing
 * `wells[i − 1]`) or through pipes (`pipes[j] = [house1, house2, cost]`) from
 * a house that has it. Returns the cheapest way to supply every house.
 *
 * Treats a well as a pipe to a shared water source, node 0. Then the task
 * is a minimum spanning tree over nodes `0 … n`, found with Kruskal's
 * algorithm.
 *
 * @see https://leetcode.com/problems/optimize-water-distribution-in-a-village/
 * @difficulty Hard
 * @timeComplexity O((n + p) log(n + p)) for p pipes
 * @spaceComplexity O(n + p)
 *
 * @example
 * optimizeWaterDistributionInAVillage(3, [1, 2, 2], [[1, 2, 1], [2, 3, 1]]); // 3
 */
export const optimizeWaterDistributionInAVillage = (
	n: number,
	wells: readonly number[],
	pipes: readonly (readonly number[])[],
): number => {
	const edges = [
		...wells.map((cost, i) => [0, i + 1, cost] as const),
		...pipes,
	].toSorted((a, b) => (a[2] ?? 0) - (b[2] ?? 0));
	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	let total = 0;
	for (const [a = 0, b = 0, cost = 0] of edges) {
		const [rootA, rootB] = [find(a), find(b)];
		if (rootA === rootB) continue;
		parent[rootA] = rootB;
		total += cost;
	}
	return total;
};
