/**
 * 2549. Count Distinct Numbers on Board
 *
 * Starting with `n` on a board, every day adds each `i` from 1 to `n`
 * for which some number `x` on the board has `x % i === 1`. Returns how
 * many distinct numbers are on the board after 10⁹ days.
 *
 * `x - 1` always qualifies for `x > 2`, so every number from 2 to `n`
 * appears; 1 never does unless it was there.
 *
 * @see https://leetcode.com/problems/count-distinct-numbers-on-board/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * countDistinctNumbersOnBoard(5); // 4
 */
export const countDistinctNumbersOnBoard = (n: number): number =>
	Math.max(1, n - 1);
