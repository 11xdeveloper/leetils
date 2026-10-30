/**
 * 2706. Buy Two Chocolates
 *
 * Returns the money left after buying the two cheapest chocolates, or
 * all of `money` if they cost more than that.
 *
 * Find the two smallest prices in one pass.
 *
 * @see https://leetcode.com/problems/buy-two-chocolates/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * buyTwoChocolates([1, 2, 2], 3); // 0
 */
export const buyTwoChocolates = (
	prices: readonly number[],
	money: number,
): number => {
	let first = Number.POSITIVE_INFINITY;
	let second = Number.POSITIVE_INFINITY;
	for (const price of prices) {
		if (price < first) [first, second] = [price, first];
		else if (price < second) second = price;
	}
	return first + second <= money ? money - first - second : money;
};
