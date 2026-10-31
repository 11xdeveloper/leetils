/**
 * 2240. Number of Ways to Buy Pens and Pencils
 *
 * Counts the ways to spend at most `total` on pens costing `cost1` and
 * pencils costing `cost2`, buying any number of each.
 *
 * For each number of pens, the pencils can be anything up to what's left.
 *
 * @see https://leetcode.com/problems/number-of-ways-to-buy-pens-and-pencils/
 * @difficulty Medium
 * @timeComplexity O(total / cost1)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfWaysToBuyPensAndPencils(20, 10, 5); // 9
 */
export const numberOfWaysToBuyPensAndPencils = (
	total: number,
	cost1: number,
	cost2: number,
): number => {
	let ways = 0;
	for (let spent = 0; spent <= total; spent += cost1)
		ways += Math.floor((total - spent) / cost2) + 1;
	return ways;
};
