/**
 * 2087. Minimum Cost Homecoming of a Robot in a Grid
 *
 * Moving into row `r` costs `rowCosts[r]` and into column `c` costs
 * `colCosts[c]`. Returns the least cost to move the robot from `startPos`
 * to `homePos`.
 *
 * Every path enters each row and column between the two exactly once, so
 * the direct route is optimal.
 *
 * @see https://leetcode.com/problems/minimum-cost-homecoming-of-a-robot-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m + n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumCostHomecomingOfARobotInAGrid([1, 0], [2, 3], [5, 4, 3], [8, 2, 6, 7]); // 18
 */
export const minimumCostHomecomingOfARobotInAGrid = (
	startPos: readonly number[],
	homePos: readonly number[],
	rowCosts: readonly number[],
	colCosts: readonly number[],
): number => {
	const between = (
		from: number,
		to: number,
		costs: readonly number[],
	): number => {
		let cost = 0;
		const step = Math.sign(to - from);
		for (let i = from; i !== to; i += step) cost += costs[i + step] ?? 0;
		return cost;
	};
	const [startRow = 0, startCol = 0] = startPos;
	const [homeRow = 0, homeCol = 0] = homePos;
	return (
		between(startRow, homeRow, rowCosts) + between(startCol, homeCol, colCosts)
	);
};
