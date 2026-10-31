/**
 * 3947. Maximum Number of Items From Sale II
 *
 * Buy copies of items within `budget`. Each bought copy of item i can
 * bring one free copy of a different item whose factor is a multiple of
 * item i's, at most once per such item. Returns the most copies.
 *
 * Item i's first bᵢ copies (bᵢ = how many other items it can bring) are
 * worth 2 each, later ones 1. Compared with spending on the cheapest item
 * (price c, worth 1 a copy), a doubled copy costing at most 2c never
 * hurts and one costing more never helps, even with rounding. So buy
 * doubled copies cheapest first while they're at most 2c, then fill up
 * with the cheapest item.
 *
 * @see https://leetcode.com/problems/maximum-number-of-items-from-sale-ii/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumNumberOfItemsFromSaleII([[1, 6], [2, 4], [3, 5]], 19); // 5
 */
export const maximumNumberOfItemsFromSaleII = (
	items: readonly (readonly number[])[],
	budget: number,
): number => {
	const largest = Math.max(...items.map(([factor = 1]) => factor));
	const withFactor = new Array<number>(largest + 1).fill(0);
	for (const [factor = 1] of items)
		withFactor[factor] = (withFactor[factor] ?? 0) + 1;
	const multiples = new Array<number>(largest + 1).fill(0);
	for (let f = 1; f <= largest; f++)
		for (let x = f; x <= largest; x += f)
			multiples[f] = (multiples[f] ?? 0) + (withFactor[x] ?? 0);
	const cheapest = Math.min(...items.map(([, price = 1]) => price));
	let [left, doubled] = [budget, 0];
	const bonuses = items
		.map(
			([factor = 1, price = 1]) =>
				[price, (multiples[factor] ?? 1) - 1] as const,
		)
		.filter(([price, bonus]) => bonus > 0 && price <= 2 * cheapest)
		.sort((a, b) => a[0] - b[0]);
	for (const [price, bonus] of bonuses) {
		const take = Math.min(bonus, Math.floor(left / price));
		left -= take * price;
		doubled += take;
	}
	return 2 * doubled + Math.floor(left / cheapest);
};
