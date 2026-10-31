/**
 * 3814. Maximum Capacity Within Budget
 *
 * Pick at most two different machines costing strictly less than `budget`
 * in total. Returns the most capacity they can provide.
 *
 * Sort machines by cost. For each, the best partner is the most capable
 * of the cheaper machines it can afford alongside, found by binary search
 * over a running maximum.
 *
 * @see https://leetcode.com/problems/maximum-capacity-within-budget/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumCapacityWithinBudget([4, 8, 5, 3], [1, 5, 2, 7], 8); // 8
 */
export const maximumCapacityWithinBudget = (
	costs: readonly number[],
	capacity: readonly number[],
	budget: number,
): number => {
	const order = costs
		.map((_, i) => i)
		.sort((a, b) => (costs[a] ?? 0) - (costs[b] ?? 0));
	const sortedCosts = order.map((i) => costs[i] ?? 0);
	const bestUpTo: number[] = [];
	for (const i of order)
		bestUpTo.push(Math.max(bestUpTo.at(-1) ?? 0, capacity[i] ?? 0));
	let best = 0;
	order.forEach((i, rank) => {
		const cost = costs[i] ?? 0;
		if (cost >= budget) return;
		const own = capacity[i] ?? 0;
		best = Math.max(best, own);
		// Partners: earlier machines costing less than budget - cost.
		let [lo, hi] = [0, rank];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((sortedCosts[mid] ?? 0) < budget - cost) lo = mid + 1;
			else hi = mid;
		}
		if (lo > 0) best = Math.max(best, own + (bestUpTo[lo - 1] ?? 0));
	});
	return best;
};
