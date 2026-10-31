/**
 * 3100. Water Bottles II
 *
 * Drink full bottles to make them empty, and trade `numExchange` empties for
 * one full bottle, after which the trade costs one more empty each time.
 * Returns the most bottles you can drink, starting with `numBottles` full.
 *
 * Drink everything, then trade while you can, drinking each new bottle.
 *
 * @see https://leetcode.com/problems/water-bottles-ii/
 * @difficulty Medium
 * @timeComplexity O(√numBottles)
 * @spaceComplexity O(1)
 *
 * @example
 * waterBottlesII(13, 6); // 15
 */
export const waterBottlesII = (
	numBottles: number,
	numExchange: number,
): number => {
	let drunk = numBottles;
	let empty = numBottles;
	for (let cost = numExchange; empty >= cost; cost++) {
		empty -= cost - 1;
		drunk++;
	}
	return drunk;
};
