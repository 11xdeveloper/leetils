/**
 * 2029. Stone Game IX
 *
 * Alice and Bob take turns removing stones; whoever makes the removed
 * total divisible by 3 loses, and Bob wins if the stones run out. Returns
 * whether Alice, moving first, wins.
 *
 * Only values mod 3 matter. Without zeros the play is forced into
 * alternating 1s and 2s, and Alice wins by opening with the rarer kind if
 * both exist. An even number of zeros cancels out; an odd number hands
 * the turn over, so Alice then needs one kind to outnumber the other by
 * more than 2.
 *
 * @see https://leetcode.com/problems/stone-game-ix/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * stoneGameIX([2, 1]); // true
 */
export const stoneGameIX = (stones: readonly number[]): boolean => {
	const counts = [0, 0, 0];
	for (const stone of stones) counts[stone % 3] = (counts[stone % 3] ?? 0) + 1;
	const [zeros = 0, ones = 0, twos = 0] = counts;
	return zeros % 2 === 0 ? ones > 0 && twos > 0 : Math.abs(ones - twos) > 2;
};
