/**
 * 2830. Maximize the Profit as the Salesman
 *
 * Each offer `[start, end, gold]` buys houses `start..end` for `gold`;
 * no house can be sold twice. Returns the most gold you can earn.
 *
 * Dynamic programming over houses: the best up to house `i` either skips
 * it or takes an offer ending there, added to the best before its start.
 *
 * @see https://leetcode.com/problems/maximize-the-profit-as-the-salesman/
 * @difficulty Medium
 * @timeComplexity O(n + offers)
 * @spaceComplexity O(n + offers)
 *
 * @example
 * maximizeTheProfitAsTheSalesman(5, [[0, 0, 1], [0, 2, 10], [1, 3, 2]]); // 10
 */
export const maximizeTheProfitAsTheSalesman = (
	n: number,
	offers: readonly (readonly number[])[],
): number => {
	const endingAt: [number, number][][] = Array.from({ length: n }, () => []);
	for (const [start = 0, end = 0, gold = 0] of offers)
		endingAt[end]?.push([start, gold]);
	const best = [0];
	for (let house = 0; house < n; house++) {
		let value = best[house] ?? 0;
		for (const [start, gold] of endingAt[house] ?? [])
			value = Math.max(value, (best[start] ?? 0) + gold);
		best.push(value);
	}
	return best[n] ?? 0;
};
