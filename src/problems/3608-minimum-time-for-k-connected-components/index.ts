/**
 * 3608. Minimum Time for K Connected Components
 *
 * At time t, every edge `[u, v, time]` with time ≤ t is gone. Returns the
 * earliest t leaving at least `k` connected components.
 *
 * Add edges from the latest-removed down. The first edge that would drop
 * the count below k has to be gone, so its time is the answer; if none
 * does, time 0 already works.
 *
 * @see https://leetcode.com/problems/minimum-time-for-k-connected-components/
 * @difficulty Medium
 * @timeComplexity O(m log m + m α(n))
 * @spaceComplexity O(n + m)
 *
 * @example
 * minimumTimeForKConnectedComponents(3, [[0, 1, 2], [1, 2, 4]], 3); // 4
 */
export const minimumTimeForKConnectedComponents = (
	n: number,
	edges: readonly (readonly number[])[],
	k: number,
): number => {
	const parent = Array.from({ length: n }, (_, i) => i);
	const find = (x: number): number => {
		while (parent[x] !== x) {
			parent[x] = parent[parent[x] ?? x] ?? x;
			x = parent[x] ?? x;
		}
		return x;
	};
	let components = n;
	for (const [u = 0, v = 0, time = 0] of [...edges].sort(
		(a, b) => (b[2] ?? 0) - (a[2] ?? 0),
	)) {
		const [a, b] = [find(u), find(v)];
		if (a === b) continue;
		if (components - 1 < k) return time;
		parent[a] = b;
		components--;
	}
	return 0;
};
