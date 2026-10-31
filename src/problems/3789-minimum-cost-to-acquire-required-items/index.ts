/**
 * 3789. Minimum Cost to Acquire Required Items
 *
 * Items of type 1 cost `cost1`, type 2 cost `cost2`, and a bundle of one
 * of each costs `costBoth`. Returns the least cost for at least `need1`
 * of type 1 and `need2` of type 2.
 *
 * The cost is piecewise linear in the number of bundles, bending only at
 * min(need1, need2) and max(need1, need2), so check those and none.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-acquire-required-items/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostToAcquireRequiredItems(3, 2, 1, 3, 2); // 3
 */
export const minimumCostToAcquireRequiredItems = (
	cost1: number,
	cost2: number,
	costBoth: number,
	need1: number,
	need2: number,
): number => {
	const cost = (bundles: number): number =>
		bundles * costBoth +
		Math.max(0, need1 - bundles) * cost1 +
		Math.max(0, need2 - bundles) * cost2;
	return Math.min(
		cost(0),
		cost(Math.min(need1, need2)),
		cost(Math.max(need1, need2)),
	);
};
