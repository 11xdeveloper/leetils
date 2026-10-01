/**
 * 1475. Final Prices With a Special Discount in a Shop
 *
 * Each item is discounted by the price of the next item to its right that
 * costs no more than it (if any). Returns the prices paid.
 *
 * A stack of items still waiting for their discount, in increasing price
 * order: each new price settles every waiting item it doesn't exceed.
 *
 * @see https://leetcode.com/problems/final-prices-with-a-special-discount-in-a-shop/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * finalPricesWithASpecialDiscountInAShop([8, 4, 6, 2, 3]); // [4, 2, 4, 2, 3]
 */
export const finalPricesWithASpecialDiscountInAShop = (
	prices: readonly number[],
): number[] => {
	const paid = [...prices];
	const waiting: number[] = [];
	prices.forEach((price, i) => {
		while (waiting.length > 0 && (prices[waiting.at(-1) ?? 0] ?? 0) >= price) {
			const item = waiting.pop() ?? 0;
			paid[item] = (paid[item] ?? 0) - price;
		}
		waiting.push(i);
	});
	return paid;
};
