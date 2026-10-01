/**
 * 1547. Minimum Cost to Cut a Stick
 *
 * Cutting a stick costs its current length. Returns the cheapest way to make
 * all of `cuts` in a stick of length `n`, in any order.
 *
 * Interval dynamic programming over the sorted cut points (with the ends
 * added): the cheapest way to finish a piece between two points is its
 * length plus the best first cut inside it.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-cut-a-stick/
 * @difficulty Hard
 * @timeComplexity O(m^3) for m cuts
 * @spaceComplexity O(m^2)
 *
 * @example
 * minimumCostToCutAStick(7, [1, 3, 4, 5]); // 16
 */
export const minimumCostToCutAStick = (
	n: number,
	cuts: readonly number[],
): number => {
	const points = [0, ...cuts.toSorted((a, b) => a - b), n];
	const m = points.length;
	const cost = Array.from({ length: m }, () => new Array<number>(m).fill(0));
	for (let gap = 2; gap < m; gap++) {
		for (let i = 0; i + gap < m; i++) {
			const j = i + gap;
			let cheapest = Infinity;
			for (let k = i + 1; k < j; k++) {
				cheapest = Math.min(
					cheapest,
					(cost[i]?.[k] ?? 0) + (cost[k]?.[j] ?? 0),
				);
			}
			const row = cost[i];
			if (row) row[j] = cheapest + (points[j] ?? 0) - (points[i] ?? 0);
		}
	}
	return cost[0]?.[m - 1] ?? 0;
};
