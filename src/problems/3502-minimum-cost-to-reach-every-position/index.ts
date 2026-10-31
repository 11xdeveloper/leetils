/**
 * 3502. Minimum Cost to Reach Every Position
 *
 * You stand behind a line of people and can swap with person i for
 * `cost[i]`, then swap with anyone behind them for free. Returns the
 * cheapest way to reach each position.
 *
 * Reaching position i means paying the cheapest person at or before it.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-reach-every-position/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToReachEveryPosition([5, 3, 4, 1, 3, 2]); // [5, 3, 3, 1, 1, 1]
 */
export const minimumCostToReachEveryPosition = (
	cost: readonly number[],
): number[] => {
	let cheapest = Number.POSITIVE_INFINITY;
	return cost.map((c) => {
		cheapest = Math.min(cheapest, c);
		return cheapest;
	});
};
