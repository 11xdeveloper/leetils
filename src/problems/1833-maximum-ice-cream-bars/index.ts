/**
 * 1833. Maximum Ice Cream Bars
 *
 * Returns the most ice cream bars (each costing `costs[i]`) buyable with
 * `coins`.
 *
 * Buy the cheapest first, using a counting sort over costs.
 *
 * @see https://leetcode.com/problems/maximum-ice-cream-bars/
 * @difficulty Medium
 * @timeComplexity O(n + M) for the largest cost M
 * @spaceComplexity O(M)
 *
 * @example
 * maximumIceCreamBars([1, 3, 2, 4, 1], 7); // 4
 */
export const maximumIceCreamBars = (
	costs: readonly number[],
	coins: number,
): number => {
	const counts = new Array<number>(Math.max(...costs) + 1).fill(0);
	for (const cost of costs) counts[cost] = (counts[cost] ?? 0) + 1;
	let [left, bought] = [coins, 0];
	for (let cost = 1; cost < counts.length && cost <= left; cost++) {
		const taken = Math.min(counts[cost] ?? 0, Math.floor(left / cost));
		bought += taken;
		left -= taken * cost;
	}
	return bought;
};
