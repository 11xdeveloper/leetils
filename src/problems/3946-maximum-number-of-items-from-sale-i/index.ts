/**
 * 3946. Maximum Number of Items From Sale I
 *
 * Buy copies of items within `budget`. Buying at least one copy of item i
 * also gives a free copy of every other item whose factor is a multiple
 * of item i's. Returns the most copies obtainable.
 *
 * Buying item i at least once is worth 1 plus its free copies, which
 * doesn't depend on anything else, so choose those items with a 0/1
 * knapsack. Spend whatever is left on extra copies of the cheapest item.
 *
 * @see https://leetcode.com/problems/maximum-number-of-items-from-sale-i/
 * @difficulty Medium
 * @timeComplexity O(n² + n · budget)
 * @spaceComplexity O(budget)
 *
 * @example
 * maximumNumberOfItemsFromSaleI([[6, 2], [2, 6], [3, 4]], 9); // 4
 */
export const maximumNumberOfItemsFromSaleI = (
	items: readonly (readonly number[])[],
	budget: number,
): number => {
	const value = items.map(([factor = 1], i) => {
		let free = 0;
		items.forEach(([other = 1], j) => {
			if (j !== i && other % factor === 0) free++;
		});
		return 1 + free;
	});
	const best = new Array<number>(budget + 1).fill(Number.NEGATIVE_INFINITY);
	best[0] = 0;
	items.forEach(([, price = 1], i) => {
		for (let spent = budget; spent >= price; spent--)
			best[spent] = Math.max(
				best[spent] ?? 0,
				(best[spent - price] ?? 0) + (value[i] ?? 0),
			);
	});
	const cheapest = Math.min(...items.map(([, price = 1]) => price));
	let answer = 0;
	best.forEach((count, spent) => {
		if (count >= 0)
			answer = Math.max(
				answer,
				count + Math.floor((budget - spent) / cheapest),
			);
	});
	return answer;
};
