/**
 * 3710. Maximum Partition Factor
 *
 * Split the points into two non-empty groups; the split's factor is the
 * smallest Manhattan distance between two points in the same group (0
 * with just two points). Returns the largest factor.
 *
 * A factor of at least d needs every pair closer than d in different
 * groups, so the graph of such pairs must be bipartite. Binary search the
 * pairwise distances for the largest d that works.
 *
 * @see https://leetcode.com/problems/maximum-partition-factor/
 * @difficulty Hard
 * @timeComplexity O(n² log n)
 * @spaceComplexity O(n²)
 *
 * @example
 * maximumPartitionFactor([[0, 0], [0, 1], [10, 0]]); // 11
 */
export const maximumPartitionFactor = (
	points: readonly (readonly number[])[],
): number => {
	const n = points.length;
	if (n <= 2) return 0;
	const distance = (i: number, j: number): number => {
		const [x1 = 0, y1 = 0] = points[i] ?? [];
		const [x2 = 0, y2 = 0] = points[j] ?? [];
		return Math.abs(x1 - x2) + Math.abs(y1 - y2);
	};
	const candidates: number[] = [];
	for (let i = 0; i < n; i++)
		for (let j = i + 1; j < n; j++) candidates.push(distance(i, j));
	const sorted = [...new Set(candidates)].sort((a, b) => a - b);
	const bipartite = (d: number): boolean => {
		const side = new Int8Array(n).fill(-1);
		for (let start = 0; start < n; start++) {
			if (side[start] !== -1) continue;
			side[start] = 0;
			const stack = [start];
			while (stack.length > 0) {
				const v = stack.pop() ?? 0;
				for (let u = 0; u < n; u++) {
					if (u === v || distance(u, v) >= d) continue;
					if (side[u] === -1) {
						side[u] = 1 - (side[v] ?? 0);
						stack.push(u);
					} else if (side[u] === side[v]) return false;
				}
			}
		}
		return true;
	};
	let [lo, hi] = [0, sorted.length - 1];
	while (lo < hi) {
		const mid = lo + Math.ceil((hi - lo) / 2);
		if (bipartite(sorted[mid] ?? 0)) lo = mid;
		else hi = mid - 1;
	}
	return sorted[lo] ?? 0;
};
