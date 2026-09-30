/**
 * 1135. Connecting Cities With Minimum Cost
 *
 * `connections[i] = [x, y, cost]` can join cities `x` and `y` (numbered from
 * 1 to `n`). Returns the smallest total cost connecting every city, or -1
 * if that's impossible.
 *
 * Kruskal's algorithm: takes connections from cheapest up, keeping those
 * that join two separate groups (tracked with union–find).
 *
 * @see https://leetcode.com/problems/connecting-cities-with-minimum-cost/
 * @difficulty Medium
 * @timeComplexity O(n + m log m) for m connections
 * @spaceComplexity O(n + m)
 *
 * @example
 * connectingCitiesWithMinimumCost(3, [[1, 2, 5], [1, 3, 6], [2, 3, 1]]); // 6
 */
export const connectingCitiesWithMinimumCost = (
	n: number,
	connections: readonly (readonly number[])[],
): number => {
	const parent = Array.from({ length: n + 1 }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			const grandparent = parent[parent[x] ?? x] ?? x;
			parent[x] = grandparent;
			x = grandparent;
		}
		return x;
	};
	let [total, groups] = [0, n];
	for (const [x = 0, y = 0, cost = 0] of connections.toSorted(
		(a, b) => (a[2] ?? 0) - (b[2] ?? 0),
	)) {
		const [rootX, rootY] = [find(x), find(y)];
		if (rootX === rootY) continue;
		parent[rootX] = rootY;
		total += cost;
		groups--;
	}
	return groups === 1 ? total : -1;
};
