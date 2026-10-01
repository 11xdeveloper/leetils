/**
 * 1595. Minimum Cost to Connect Two Groups of Points
 *
 * Connecting point `i` of the first group to point `j` of the second costs
 * `cost[i][j]`. Returns the cheapest set of connections leaving every point
 * of both groups connected to at least one point of the other.
 *
 * Dynamic programming over the first group, with the set of second-group
 * points covered as a bitmask. Each first-group point connects to some
 * non-empty set of second-group points; it's enough to try single
 * connections and extending a set by one point. Finally, uncovered
 * second-group points each take their cheapest connection.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-connect-two-groups-of-points/
 * @difficulty Hard
 * @timeComplexity O(m · n · 2^n)
 * @spaceComplexity O(2^n)
 *
 * @example
 * minimumCostToConnectTwoGroupsOfPoints([[1, 3, 5], [4, 1, 1], [1, 5, 3]]); // 4
 */
export const minimumCostToConnectTwoGroupsOfPoints = (
	cost: readonly (readonly number[])[],
): number => {
	const n = cost[0]?.length ?? 0;
	const full = 1 << n;
	const cheapest = Array.from({ length: n }, (_, j) =>
		Math.min(...cost.map((row) => row[j] ?? Infinity)),
	);
	let best = new Array<number>(full).fill(Infinity);
	best[0] = 0;
	for (const row of cost) {
		const next = new Array<number>(full).fill(Infinity);
		for (let mask = 0; mask < full; mask++) {
			for (let j = 0; j < n; j++) {
				const price = row[j] ?? 0;
				const to = mask | (1 << j);
				// Connect to j alone after the earlier points, or add j to this point's connections.
				next[to] = Math.min(
					next[to] ?? Infinity,
					(best[mask] ?? Infinity) + price,
					(next[mask] ?? Infinity) + price,
				);
			}
		}
		best = next;
	}
	let answer = Infinity;
	for (let mask = 0; mask < full; mask++) {
		let total = best[mask] ?? Infinity;
		for (let j = 0; j < n; j++)
			if (!(mask & (1 << j))) total += cheapest[j] ?? 0;
		answer = Math.min(answer, total);
	}
	return answer;
};
