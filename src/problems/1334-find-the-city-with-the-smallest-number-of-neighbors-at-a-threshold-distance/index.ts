/**
 * 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
 *
 * Cities `0 … n − 1` are joined by weighted two-way `edges`. Returns the
 * city with the fewest other cities within `distanceThreshold`, preferring
 * the highest-numbered on ties.
 *
 * Floyd–Warshall finds every shortest distance, then each city counts its
 * neighbours within the threshold.
 *
 * @see https://leetcode.com/problems/find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistance(4, [[0, 1, 3], [1, 2, 1], [1, 3, 4], [2, 3, 1]], 4); // 3
 */
export const findTheCityWithTheSmallestNumberOfNeighborsAtAThresholdDistance = (
	n: number,
	edges: readonly (readonly number[])[],
	distanceThreshold: number,
): number => {
	const distance = Array.from({ length: n }, (_, i) =>
		Array.from({ length: n }, (_, j) => (i === j ? 0 : Infinity)),
	);
	for (const [a = 0, b = 0, weight = 0] of edges) {
		const [rowA, rowB] = [distance[a] ?? [], distance[b] ?? []];
		rowA[b] = Math.min(rowA[b] ?? Infinity, weight);
		rowB[a] = Math.min(rowB[a] ?? Infinity, weight);
	}
	for (let k = 0; k < n; k++) {
		const rowK = distance[k] ?? [];
		for (const row of distance) {
			const toK = row[k] ?? Infinity;
			if (toK === Infinity) continue;
			for (let j = 0; j < n; j++) {
				const through = toK + (rowK[j] ?? Infinity);
				if (through < (row[j] ?? Infinity)) row[j] = through;
			}
		}
	}
	let [best, fewest] = [0, Infinity];
	distance.forEach((row, city) => {
		const reachable = row.filter(
			(d, j) => j !== city && d <= distanceThreshold,
		).length;
		if (reachable <= fewest) [best, fewest] = [city, reachable];
	});
	return best;
};
