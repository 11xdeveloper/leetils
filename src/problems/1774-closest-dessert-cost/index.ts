/**
 * 1774. Closest Dessert Cost
 *
 * A dessert has exactly one base and up to two of each topping. Returns
 * the cost closest to `target`, the lower one on ties.
 *
 * With at most 10 toppings, list every topping total (each used 0, 1 or 2
 * times) and combine with every base.
 *
 * @see https://leetcode.com/problems/closest-dessert-cost/
 * @difficulty Medium
 * @timeComplexity O(b · 3^t) for b bases and t toppings
 * @spaceComplexity O(3^t)
 *
 * @example
 * closestDessertCost([2, 3], [4, 5, 100], 18); // 17
 */
export const closestDessertCost = (
	baseCosts: readonly number[],
	toppingCosts: readonly number[],
	target: number,
): number => {
	let toppings = [0];
	for (const cost of toppingCosts)
		toppings = toppings.flatMap((total) => [
			total,
			total + cost,
			total + 2 * cost,
		]);
	let best = Infinity;
	for (const base of baseCosts) {
		for (const extra of toppings) {
			const cost = base + extra;
			const [gap, bestGap] = [Math.abs(cost - target), Math.abs(best - target)];
			if (gap < bestGap || (gap === bestGap && cost < best)) best = cost;
		}
	}
	return best;
};
