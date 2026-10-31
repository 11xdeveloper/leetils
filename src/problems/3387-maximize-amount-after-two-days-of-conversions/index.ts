/**
 * 3387. Maximize Amount After Two Days of Conversions
 *
 * Starting with 1 unit of `initialCurrency`, convert as you like with
 * day one's rates, then with day two's (each rate also works in reverse at
 * its inverse). Returns the most `initialCurrency` you can end with.
 *
 * The rates are consistent, so within a day any route between two
 * currencies gives the same rate. Find day one's rate to every currency
 * and day two's rate from each back, and take the best product.
 *
 * @see https://leetcode.com/problems/maximize-amount-after-two-days-of-conversions/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * maximizeAmountAfterTwoDaysOfConversions("EUR", [["EUR", "USD"], ["USD", "JPY"]], [2.0, 3.0], [["JPY", "USD"], ["USD", "CHF"], ["CHF", "EUR"]], [4.0, 5.0, 6.0]); // 720
 */
export const maximizeAmountAfterTwoDaysOfConversions = (
	initialCurrency: string,
	pairs1: readonly (readonly string[])[],
	rates1: readonly number[],
	pairs2: readonly (readonly string[])[],
	rates2: readonly number[],
): number => {
	const reach = (
		pairs: readonly (readonly string[])[],
		rates: readonly number[],
	): Map<string, number> => {
		const adjacent = new Map<string, [string, number][]>();
		pairs.forEach(([from = "", to = ""], i) => {
			const rate = rates[i] ?? 1;
			adjacent.set(from, [...(adjacent.get(from) ?? []), [to, rate]]);
			adjacent.set(to, [...(adjacent.get(to) ?? []), [from, 1 / rate]]);
		});
		const amount = new Map([[initialCurrency, 1]]);
		const queue = [initialCurrency];
		for (let i = 0; i < queue.length; i++) {
			const currency = queue[i] ?? "";
			for (const [next, rate] of adjacent.get(currency) ?? [])
				if (!amount.has(next)) {
					amount.set(next, (amount.get(currency) ?? 1) * rate);
					queue.push(next);
				}
		}
		return amount;
	};
	const day1 = reach(pairs1, rates1);
	const day2 = reach(pairs2, rates2);
	let best = 1;
	for (const [currency, amount] of day1) {
		const back = day2.get(currency);
		if (back !== undefined) best = Math.max(best, amount / back);
	}
	return best;
};
