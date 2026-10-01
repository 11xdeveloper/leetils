/**
 * 1908. Game of Nim
 *
 * Players alternately remove any positive number of stones from one pile;
 * whoever can't move loses. Returns whether Alice, moving first, wins.
 *
 * Bouton's theorem: the first player wins exactly when the XOR of the pile
 * sizes is non-zero.
 *
 * @see https://leetcode.com/problems/game-of-nim/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * gameOfNim([1, 2, 3]); // false
 */
export const gameOfNim = (piles: readonly number[]): boolean =>
	piles.reduce((xor, pile) => xor ^ pile, 0) !== 0;
