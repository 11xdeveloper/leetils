/**
 * 1025. Divisor Game
 *
 * Starting from `n`, players alternately replace `n` with `n - x` for some
 * divisor `x` of `n` with `0 < x < n`; a player with no move loses. Returns
 * whether the first player (Alice) wins with optimal play.
 *
 * Alice wins exactly when `n` is even: subtracting 1 always hands Bob an odd
 * number, and every divisor of an odd number is odd, so Bob can only hand
 * back an even number, until he's left with 1.
 *
 * @see https://leetcode.com/problems/divisor-game/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * divisorGame(2); // true
 */
export const divisorGame = (n: number): boolean => n % 2 === 0;
