/**
 * 1872. Stone Game VIII
 *
 * Players alternately replace the leftmost `x > 1` stones with one stone
 * worth their sum, scoring that sum. Returns Alice's score minus Bob's
 * with optimal play.
 *
 * The new stone keeps the prefix sum, so a move just picks how far the
 * prefix reaches, scoring `prefix[i]`, and later moves reach further.
 * `best` is the best lead for the player to move when the next move must
 * end at or after `i`: take this prefix minus the opponent's best after
 * it, or skip ahead.
 *
 * @see https://leetcode.com/problems/stone-game-viii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * stoneGameVIII([-1, 2, -3, 4, -5]); // 5
 */
export const stoneGameVIII = (stones: readonly number[]): number => {
	const prefix: number[] = [];
	for (const stone of stones) prefix.push((prefix.at(-1) ?? 0) + stone);
	let best = prefix.at(-1) ?? 0;
	for (let i = stones.length - 2; i >= 1; i--)
		best = Math.max(best, (prefix[i] ?? 0) - best);
	return best;
};
