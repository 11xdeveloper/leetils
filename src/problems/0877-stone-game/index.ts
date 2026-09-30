/**
 * 877. Stone Game
 *
 * An even number of piles, with an odd total, lie in a row. Alice and Bob
 * alternately take a whole pile from either end, Alice first. Returns
 * whether Alice ends with more stones, assuming both play optimally.
 *
 * Alice always wins: colour the piles alternately; she can take every pile
 * of either colour (taking an end of her colour always leaves Bob two ends
 * of the other), and one colour has more stones since the total is odd.
 * The DP below computes the best margin anyway, confirming it.
 *
 * @see https://leetcode.com/problems/stone-game/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGame([5, 3, 4, 5]); // true
 */
export const stoneGame = (piles: readonly number[]): boolean => {
	const n = piles.length;
	// lead[j] is the best margin for the player to move on piles[i..j] for the current i.
	const lead = [...piles];
	for (let i = n - 2; i >= 0; i--) {
		for (let j = i + 1; j < n; j++)
			lead[j] = Math.max(
				(piles[i] ?? 0) - (lead[j] ?? 0),
				(piles[j] ?? 0) - (lead[j - 1] ?? 0),
			);
	}
	return (lead[n - 1] ?? 0) > 0;
};
