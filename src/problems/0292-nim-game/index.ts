/**
 * 292. Nim Game
 *
 * Two players take turns removing 1 to 3 stones from a heap of `n`; whoever
 * takes the last stone wins. Returns whether the first player can force a
 * win, with both playing perfectly.
 *
 * A heap that's a multiple of 4 is a loss for the player to move: whatever
 * they take, the opponent takes the rest of 4 and keeps it a multiple of 4.
 * Any other heap is a win, by taking enough to leave a multiple of 4.
 *
 * @see https://leetcode.com/problems/nim-game/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * nimGame(4); // false
 */
export const nimGame = (n: number): boolean => n % 4 !== 0;
