/**
 * 3620. Network Recovery Pathways
 *
 * In a directed acyclic graph with edge costs, find paths from node 0 to
 * node n - 1 through online nodes only, costing at most `k` in total.
 * Returns the largest possible smallest edge cost on such a path, or -1.
 *
 * Binary search the smallest edge cost x: keep only edges costing at least
 * x and check the cheapest path, found in topological order, is within k.
 *
 * @see https://leetcode.com/problems/network-recovery-pathways/
 * @difficulty Hard
 * @timeComplexity O((n + m) log C)
 * @spaceComplexity O(n + m)
 *
 * @example
 * networkRecoveryPathways([[0, 1, 5], [1, 3, 10], [0, 2, 3], [2, 3, 4]], [true, true, true, true], 10); // 3
 */
export const networkRecoveryPathways = (
	edges: readonly (readonly number[])[],
	online: readonly boolean[],
	k: number,
): number => {
	const n = online.length;
	const outgoing: [to: number, cost: number][][] = Array.from(
		{ length: n },
		() => [],
	);
	const indegree = new Int32Array(n);
	for (const [u = 0, v = 0, cost = 0] of edges) {
		if (!online[u] || !online[v]) continue;
		outgoing[u]?.push([v, cost]);
		indegree[v] = (indegree[v] ?? 0) + 1;
	}
	const order: number[] = [];
	for (let v = 0; v < n; v++) if (indegree[v] === 0) order.push(v);
	for (let i = 0; i < order.length; i++)
		for (const [to] of outgoing[order[i] ?? 0] ?? []) {
			indegree[to] = (indegree[to] ?? 0) - 1;
			if (indegree[to] === 0) order.push(to);
		}
	const reaches = (least: number): boolean => {
		const distance = new Array<number>(n).fill(Number.POSITIVE_INFINITY);
		distance[0] = 0;
		for (const v of order) {
			const here = distance[v] ?? Number.POSITIVE_INFINITY;
			if (here > k) continue;
			for (const [to, cost] of outgoing[v] ?? [])
				if (cost >= least)
					distance[to] = Math.min(distance[to] ?? 0, here + cost);
		}
		return (distance[n - 1] ?? Number.POSITIVE_INFINITY) <= k;
	};
	if (!reaches(0)) return -1;
	let [lo, hi] = [0, Math.max(0, ...edges.map((e) => e[2] ?? 0))];
	while (lo < hi) {
		const mid = lo + Math.ceil((hi - lo) / 2);
		if (reaches(mid)) lo = mid;
		else hi = mid - 1;
	}
	return lo;
};
