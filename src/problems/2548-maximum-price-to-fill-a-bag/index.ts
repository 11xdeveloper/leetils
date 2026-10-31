/**
 * 2548. Maximum Price to Fill a Bag
 *
 * Each item `[price, weight]` can be split into fractions, each fetching
 * its share of the price. Returns the most a bag of exactly `capacity`
 * weight can be worth, or -1 if the items can't fill it.
 *
 * Fill greedily by price per unit weight, best first.
 *
 * @see https://leetcode.com/problems/maximum-price-to-fill-a-bag/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * maximumPriceToFillABag([[50, 1], [10, 8]], 5); // 55
 */
export const maximumPriceToFillABag = (
	items: readonly (readonly number[])[],
	capacity: number,
): number => {
	const sorted = items.toSorted(
		([p1 = 0, w1 = 1], [p2 = 0, w2 = 1]) => p2 * w1 - p1 * w2,
	);
	let room = capacity;
	let total = 0;
	for (const [price = 0, weight = 1] of sorted) {
		const taken = Math.min(weight, room);
		total += (price * taken) / weight;
		room -= taken;
		if (room === 0) return total;
	}
	return -1;
};
