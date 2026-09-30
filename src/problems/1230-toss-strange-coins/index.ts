/**
 * 1230. Toss Strange Coins
 *
 * Coin `i` lands heads with probability `prob[i]`. Returns the probability
 * that exactly `target` coins land heads when each is tossed once.
 *
 * Dynamic programming over the coins: `chance[h]` is the probability of `h`
 * heads so far, updated from high `h` down so each coin is used once.
 *
 * @see https://leetcode.com/problems/toss-strange-coins/
 * @difficulty Medium
 * @timeComplexity O(n · target)
 * @spaceComplexity O(target)
 *
 * @example
 * tossStrangeCoins([0.5, 0.5, 0.5, 0.5, 0.5], 0); // 0.03125
 */
export const tossStrangeCoins = (
	prob: readonly number[],
	target: number,
): number => {
	const chance = new Array<number>(target + 1).fill(0);
	chance[0] = 1;
	for (const p of prob) {
		for (let heads = target; heads >= 0; heads--) {
			chance[heads] =
				(chance[heads] ?? 0) * (1 - p) +
				(heads > 0 ? (chance[heads - 1] ?? 0) * p : 0);
		}
	}
	return chance[target] ?? 0;
};
