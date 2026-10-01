/**
 * 638. Shopping Offers
 *
 * Items have prices `price`, and each special offer is a bundle of item
 * quantities followed by the bundle's price. Returns the least it costs to
 * buy exactly `needs`, using any offers any number of times without buying
 * more than needed.
 *
 * Search with memoisation on the quantities still needed: either buy the
 * rest at full price, or apply an offer that fits and continue. Offers that
 * cost no less than their items separately are dropped first.
 *
 * @see https://leetcode.com/problems/shopping-offers/
 * @difficulty Medium
 * @timeComplexity O(S · k) for S distinct needs states and k offers
 * @spaceComplexity O(S)
 *
 * @example
 * shoppingOffers([2, 5], [[3, 0, 5], [1, 2, 10]], [3, 2]); // 14
 */
export const shoppingOffers = (
	price: readonly number[],
	special: readonly (readonly number[])[],
	needs: readonly number[],
): number => {
	const n = price.length;
	const fullPrice = (quantities: readonly number[]): number =>
		quantities.reduce(
			(total, quantity, i) => total + quantity * (price[i] ?? 0),
			0,
		);
	const offers = special.filter(
		(offer) => (offer[n] ?? 0) < fullPrice(offer.slice(0, n)),
	);

	const memo = new Map<string, number>();
	const cheapest = (left: readonly number[]): number => {
		const key = left.join();
		const known = memo.get(key);
		if (known !== undefined) return known;

		let best = fullPrice(left);
		for (const offer of offers) {
			const after = left.map((quantity, i) => quantity - (offer[i] ?? 0));
			if (after.every((quantity) => quantity >= 0))
				best = Math.min(best, (offer[n] ?? 0) + cheapest(after));
		}

		memo.set(key, best);
		return best;
	};

	return cheapest(needs);
};
