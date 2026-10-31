/**
 * 3996. Even Number of Knight Moves
 *
 * Whether a knight can go from `start` to `target` on a chessboard in an
 * even number of moves.
 *
 * Every knight move changes square colour, and a knight reaches every
 * square, so it works exactly when both squares share a colour.
 *
 * @see https://leetcode.com/problems/even-number-of-knight-moves/
 * @difficulty Easy
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * evenNumberOfKnightMoves([1, 1], [2, 2]); // true
 */
export const evenNumberOfKnightMoves = (
	start: readonly number[],
	target: readonly number[],
): boolean =>
	((start[0] ?? 0) + (start[1] ?? 0)) % 2 ===
	((target[0] ?? 0) + (target[1] ?? 0)) % 2;
