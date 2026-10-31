/**
 * 3820. Pythagorean Distance Nodes in a Tree
 *
 * Counts the nodes whose distances to `x`, `y` and `z`, sorted as
 * a ≤ b ≤ c, satisfy a² + b² = c².
 *
 * Breadth-first search from each of the three targets.
 *
 * @see https://leetcode.com/problems/pythagorean-distance-nodes-in-a-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * pythagoreanDistanceNodesInATree(4, [[0, 1], [0, 2], [0, 3]], 1, 2, 3); // 3
 */
export const pythagoreanDistanceNodesInATree = (
	n: number,
	edges: readonly (readonly number[])[],
	x: number,
	y: number,
	z: number,
): number => {
	const adjacent: number[][] = Array.from({ length: n }, () => []);
	for (const [u = 0, v = 0] of edges) {
		adjacent[u]?.push(v);
		adjacent[v]?.push(u);
	}
	const distances = (source: number): Int32Array => {
		const distance = new Int32Array(n).fill(-1);
		distance[source] = 0;
		const queue = [source];
		for (let q = 0; q < queue.length; q++) {
			const v = queue[q] ?? 0;
			for (const to of adjacent[v] ?? [])
				if (distance[to] === -1) {
					distance[to] = (distance[v] ?? 0) + 1;
					queue.push(to);
				}
		}
		return distance;
	};
	const [dx, dy, dz] = [distances(x), distances(y), distances(z)];
	let count = 0;
	for (let u = 0; u < n; u++) {
		const [a = 0, b = 0, c = 0] = [dx[u] ?? 0, dy[u] ?? 0, dz[u] ?? 0].sort(
			(p, q) => p - q,
		);
		if (a * a + b * b === c * c) count++;
	}
	return count;
};
