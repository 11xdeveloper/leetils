/**
 * 2285. Maximum Total Importance of Roads
 *
 * Assigns the values 1 to `n` to the cities; a road's importance is the
 * sum of its two cities' values. Returns the largest total importance.
 *
 * A city's value counts once per road, so give the busiest cities the
 * largest values.
 *
 * @see https://leetcode.com/problems/maximum-total-importance-of-roads/
 * @difficulty Medium
 * @timeComplexity O(n log n + e)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumTotalImportanceOfRoads(5, [[0, 1], [1, 2], [2, 3], [0, 2], [1, 3], [2, 4]]); // 43
 */
export const maximumTotalImportanceOfRoads = (
	n: number,
	roads: readonly (readonly number[])[],
): number => {
	const degree = new Array<number>(n).fill(0);
	for (const [a = 0, b = 0] of roads) {
		degree[a] = (degree[a] ?? 0) + 1;
		degree[b] = (degree[b] ?? 0) + 1;
	}
	return degree
		.sort((a, b) => a - b)
		.reduce((total, d, i) => total + d * (i + 1), 0);
};
