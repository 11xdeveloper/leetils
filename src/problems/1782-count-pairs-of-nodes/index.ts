/**
 * 1782. Count Pairs Of Nodes
 *
 * For each query, counts the node pairs `a < b` with more than the query's
 * number of edges touching `a` or `b` (edges may repeat).
 *
 * The count for a pair is `degree[a] + degree[b] − shared[a][b]`. Count the
 * pairs whose degree sum exceeds the query with two pointers over sorted
 * degrees, then remove the pairs that only got there by double-counting
 * their shared edges.
 *
 * @see https://leetcode.com/problems/count-pairs-of-nodes/
 * @difficulty Hard
 * @timeComplexity O(q · (n + e) + n log n)
 * @spaceComplexity O(n + e)
 *
 * @example
 * countPairsOfNodes(4, [[1, 2], [2, 4], [1, 3], [2, 3], [2, 1]], [2, 3]); // [6, 5]
 */
export const countPairsOfNodes = (
	n: number,
	edges: readonly (readonly number[])[],
	queries: readonly number[],
): number[] => {
	const degree = new Array<number>(n + 1).fill(0);
	const shared = new Map<number, number>();
	for (const [u = 0, v = 0] of edges) {
		degree[u] = (degree[u] ?? 0) + 1;
		degree[v] = (degree[v] ?? 0) + 1;
		const key = Math.min(u, v) * (n + 1) + Math.max(u, v);
		shared.set(key, (shared.get(key) ?? 0) + 1);
	}
	const sorted = degree.slice(1).sort((a, b) => a - b);
	return queries.map((query) => {
		let pairs = 0;
		let [low, high] = [0, n - 1];
		while (low < high) {
			if ((sorted[low] ?? 0) + (sorted[high] ?? 0) > query) {
				pairs += high - low;
				high--;
			} else {
				low++;
			}
		}
		for (const [key, count] of shared) {
			const [a, b] = [Math.floor(key / (n + 1)), key % (n + 1)];
			const total = (degree[a] ?? 0) + (degree[b] ?? 0);
			if (total > query && total - count <= query) pairs--;
		}
		return pairs;
	});
};
