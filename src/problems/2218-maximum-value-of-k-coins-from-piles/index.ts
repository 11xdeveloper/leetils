/**
 * 2218. Maximum Value of K Coins From Piles
 *
 * Takes exactly `k` coins from the tops of the piles. Returns the largest
 * total value.
 *
 * A knapsack over piles: `best[j]` is the most from `j` coins so far, and
 * each pile offers its prefixes.
 *
 * @see https://leetcode.com/problems/maximum-value-of-k-coins-from-piles/
 * @difficulty Hard
 * @timeComplexity O(k · total coins)
 * @spaceComplexity O(k)
 *
 * @example
 * maximumValueOfKCoinsFromPiles([[1, 100, 3], [7, 8, 9]], 2); // 101
 */
export const maximumValueOfKCoinsFromPiles = (
	piles: readonly (readonly number[])[],
	k: number,
): number => {
	let best = new Array<number>(k + 1).fill(-Infinity);
	best[0] = 0;
	for (const pile of piles) {
		const next = [...best];
		for (let taken = 1; taken <= k; taken++) {
			let prefix = 0;
			for (
				let fromPile = 1;
				fromPile <= Math.min(pile.length, taken);
				fromPile++
			) {
				prefix += pile[fromPile - 1] ?? 0;
				next[taken] = Math.max(
					next[taken] ?? -Infinity,
					(best[taken - fromPile] ?? -Infinity) + prefix,
				);
			}
		}
		best = next;
	}
	return best[k] ?? 0;
};
