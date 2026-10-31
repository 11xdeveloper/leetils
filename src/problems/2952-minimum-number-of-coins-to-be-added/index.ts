/**
 * 2952. Minimum Number of Coins to be Added
 *
 * Returns the fewest coins to add so every amount from 1 to `target` is
 * the sum of some subsequence of coins.
 *
 * If every amount below `reach` is obtainable, a coin of at most `reach`
 * extends that to `reach + coin`; otherwise add a coin worth `reach`,
 * which doubles it.
 *
 * @see https://leetcode.com/problems/minimum-number-of-coins-to-be-added/
 * @difficulty Medium
 * @timeComplexity O(n log n + log target)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfCoinsToBeAdded([1, 4, 10], 19); // 2
 */
export const minimumNumberOfCoinsToBeAdded = (
	coins: readonly number[],
	target: number,
): number => {
	const sorted = coins.toSorted((a, b) => a - b);
	let reach = 1;
	let added = 0;
	let i = 0;
	while (reach <= target) {
		const coin = sorted[i];
		if (coin !== undefined && coin <= reach) {
			reach += coin;
			i++;
		} else {
			reach *= 2;
			added++;
		}
	}
	return added;
};
