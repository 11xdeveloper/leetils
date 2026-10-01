/**
 * 1584. Min Cost to Connect All Points
 *
 * Joining two points costs their Manhattan distance. Returns the cheapest
 * way to connect all of `points`.
 *
 * Prim's algorithm on the complete graph, with an array of each point's
 * cheapest link to the tree so far (dense graphs don't need a heap).
 *
 * @see https://leetcode.com/problems/min-cost-to-connect-all-points/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * minCostToConnectAllPoints([[0, 0], [2, 2], [3, 10], [5, 2], [7, 0]]); // 20
 */
export const minCostToConnectAllPoints = (
	points: readonly (readonly number[])[],
): number => {
	const n = points.length;
	const cheapest = new Array<number>(n).fill(Infinity);
	const inTree = new Uint8Array(n);
	cheapest[0] = 0;
	let total = 0;
	for (let added = 0; added < n; added++) {
		let next = -1;
		for (let i = 0; i < n; i++) {
			if (
				!inTree[i] &&
				(next === -1 ||
					(cheapest[i] ?? Infinity) < (cheapest[next] ?? Infinity))
			)
				next = i;
		}
		inTree[next] = 1;
		total += cheapest[next] ?? 0;
		const [x = 0, y = 0] = points[next] ?? [];
		for (let i = 0; i < n; i++) {
			if (inTree[i]) continue;
			const [x2 = 0, y2 = 0] = points[i] ?? [];
			cheapest[i] = Math.min(
				cheapest[i] ?? Infinity,
				Math.abs(x - x2) + Math.abs(y - y2),
			);
		}
	}
	return total;
};
