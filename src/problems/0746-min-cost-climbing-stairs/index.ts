/**
 * 746. Min Cost Climbing Stairs
 *
 * Step `i` costs `cost[i]` to leave, and each move climbs one or two
 * steps. Starting from step 0 or 1, returns the least cost to get past the
 * top step.
 *
 * The cheapest way to reach each step comes from the cheaper of the two
 * before it, keeping only those two.
 *
 * @see https://leetcode.com/problems/min-cost-climbing-stairs/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minCostClimbingStairs([10, 15, 20]); // 15
 */
export const minCostClimbingStairs = (cost: readonly number[]): number => {
	let twoBack = 0;
	let oneBack = 0;
	for (let step = 2; step <= cost.length; step++) {
		[twoBack, oneBack] = [
			oneBack,
			Math.min(
				oneBack + (cost[step - 1] ?? 0),
				twoBack + (cost[step - 2] ?? 0),
			),
		];
	}
	return oneBack;
};
