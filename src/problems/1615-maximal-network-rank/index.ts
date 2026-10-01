/**
 * 1615. Maximal Network Rank
 *
 * The rank of two cities counts the roads touching either (a road between
 * them counts once). Returns the largest rank of any pair.
 *
 * Degrees plus an adjacency matrix make each pair's rank constant time.
 *
 * @see https://leetcode.com/problems/maximal-network-rank/
 * @difficulty Medium
 * @timeComplexity O(n^2 + r)
 * @spaceComplexity O(n^2)
 *
 * @example
 * maximalNetworkRank(4, [[0, 1], [0, 3], [1, 2], [1, 3]]); // 4
 */
export const maximalNetworkRank = (
	n: number,
	roads: readonly (readonly number[])[],
): number => {
	const degree = new Array<number>(n).fill(0);
	const linked = Array.from({ length: n }, () => new Uint8Array(n));
	for (const [a = 0, b = 0] of roads) {
		degree[a] = (degree[a] ?? 0) + 1;
		degree[b] = (degree[b] ?? 0) + 1;
		const [rowA, rowB] = [linked[a], linked[b]];
		if (rowA) rowA[b] = 1;
		if (rowB) rowB[a] = 1;
	}
	let best = 0;
	for (let a = 0; a < n; a++) {
		for (let b = a + 1; b < n; b++) {
			best = Math.max(
				best,
				(degree[a] ?? 0) + (degree[b] ?? 0) - (linked[a]?.[b] ?? 0),
			);
		}
	}
	return best;
};
