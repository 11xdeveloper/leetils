/**
 * 1617. Count Subtrees With Max Distance Between Cities
 *
 * In a tree of cities `1 … n` (at most 15), counts the connected subsets
 * whose two furthest cities are exactly `d` apart, for each `d` from 1 to
 * `n − 1`.
 *
 * Floyd–Warshall gives every distance. Then each subset of cities, as a
 * bitmask, is connected exactly when it contains one fewer edge than it
 * has cities, and its diameter is the largest distance between two of its
 * cities.
 *
 * @see https://leetcode.com/problems/count-subtrees-with-max-distance-between-cities/
 * @difficulty Hard
 * @timeComplexity O(2^n · n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * countSubtreesWithMaxDistanceBetweenCities(4, [[1, 2], [2, 3], [2, 4]]); // [3, 4, 0]
 */
export const countSubtreesWithMaxDistanceBetweenCities = (
	n: number,
	edges: readonly (readonly number[])[],
): number[] => {
	const distance = Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)),
	);
	for (const [a = 1, b = 1] of edges) {
		const [rowA, rowB] = [distance[a - 1], distance[b - 1]];
		if (rowA) rowA[b - 1] = 1;
		if (rowB) rowB[a - 1] = 1;
	}
	for (let k = 0; k < n; k++) {
		for (const row of distance) {
			for (let j = 0; j < n; j++) {
				row[j] = Math.min(
					row[j] ?? Infinity,
					(row[k] ?? Infinity) + (distance[k]?.[j] ?? Infinity),
				);
			}
		}
	}
	const counts = new Array<number>(n - 1).fill(0);
	for (let mask = 1; mask < 1 << n; mask++) {
		const cities = Array.from({ length: n }, (_, i) => i).filter(
			(i) => mask & (1 << i),
		);
		if (cities.length < 2) continue;
		const inside = edges.filter(
			([a = 1, b = 1]) => mask & (1 << (a - 1)) && mask & (1 << (b - 1)),
		).length;
		if (inside !== cities.length - 1) continue;
		let diameter = 0;
		for (const a of cities)
			for (const b of cities)
				diameter = Math.max(diameter, distance[a]?.[b] ?? 0);
		counts[diameter - 1] = (counts[diameter - 1] ?? 0) + 1;
	}
	return counts;
};
