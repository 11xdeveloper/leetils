/**
 * 2838. Maximum Coins Heroes Can Collect
 *
 * Each hero defeats every monster with strength at most their own and
 * collects its coins. Returns the coins each hero collects.
 *
 * Sort monsters by strength with prefix sums of coins, then binary search
 * each hero's strength.
 *
 * @see https://leetcode.com/problems/maximum-coins-heroes-can-collect/
 * @difficulty Medium
 * @timeComplexity O((n + m) log m)
 * @spaceComplexity O(m)
 *
 * @example
 * maximumCoinsHeroesCanCollect([1, 4, 2], [1, 1, 5, 2, 3], [2, 3, 4, 5, 6]); // [5, 16, 10]
 */
export const maximumCoinsHeroesCanCollect = (
	heroes: readonly number[],
	monsters: readonly number[],
	coins: readonly number[],
): number[] => {
	const order = monsters
		.map((_, i) => i)
		.sort((a, b) => (monsters[a] ?? 0) - (monsters[b] ?? 0));
	const strengths = order.map((i) => monsters[i] ?? 0);
	const prefix = [0];
	for (const i of order) prefix.push((prefix.at(-1) ?? 0) + (coins[i] ?? 0));
	return heroes.map((hero) => {
		let low = 0;
		let high = strengths.length;
		while (low < high) {
			const mid = (low + high) >> 1;
			if ((strengths[mid] ?? 0) <= hero) low = mid + 1;
			else high = mid;
		}
		return prefix[low] ?? 0;
	});
};
