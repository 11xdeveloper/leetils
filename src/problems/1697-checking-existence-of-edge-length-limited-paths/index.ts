/**
 * 1697. Checking Existence of Edge Length Limited Paths
 *
 * For each query `[p, q, limit]`, returns whether `p` and `q` are joined
 * by a path whose every edge is shorter than `limit`.
 *
 * Offline: sort the edges and the queries by length, and answer each query
 * after uniting all edges shorter than its limit.
 *
 * @see https://leetcode.com/problems/checking-existence-of-edge-length-limited-paths/
 * @difficulty Hard
 * @timeComplexity O(E log E + Q log Q + (E + Q) · α(n))
 * @spaceComplexity O(n + Q)
 *
 * @example
 * checkingExistenceOfEdgeLengthLimitedPaths(3, [[0, 1, 2], [1, 2, 4], [2, 0, 8], [1, 0, 16]], [[0, 1, 2], [0, 2, 5]]); // [false, true]
 */
export const checkingExistenceOfEdgeLengthLimitedPaths = (
	n: number,
	edgeList: readonly (readonly number[])[],
	queries: readonly (readonly number[])[],
): boolean[] => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number) => {
		let root = x;
		while (parent[root] !== root) root = parent[root] ?? root;
		for (let node = x; node !== root; ) {
			const next = parent[node] ?? root;
			parent[node] = root;
			node = next;
		}
		return root;
	};
	const edges = edgeList.toSorted((a, b) => (a[2] ?? 0) - (b[2] ?? 0));
	const order = queries
		.map((_, i) => i)
		.sort((i, j) => (queries[i]?.[2] ?? 0) - (queries[j]?.[2] ?? 0));
	const answer = new Array<boolean>(queries.length).fill(false);
	let next = 0;
	for (const i of order) {
		const [p = 0, q = 0, limit = 0] = queries[i] ?? [];
		for (; next < edges.length && (edges[next]?.[2] ?? 0) < limit; next++) {
			const [u = 0, v = 0] = edges[next] ?? [];
			parent[find(u)] = find(v);
		}
		answer[i] = find(p) === find(q);
	}
	return answer;
};
