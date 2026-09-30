/**
 * 794. Valid Tic-Tac-Toe State
 *
 * Returns whether the 3 × 3 tic-tac-toe `board` (rows of `"X"`, `"O"` and
 * `" "`) can occur in a game where X moves first, players alternate, and
 * play stops once someone wins.
 *
 * X has as many marks as O or one more. If X has won, X made the last move,
 * so has one more; if O has won, the counts are equal; and both can't have
 * won.
 *
 * @see https://leetcode.com/problems/valid-tic-tac-toe-state/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * validTicTacToeState(["XOX", " X ", "   "]); // false
 */
export const validTicTacToeState = (board: readonly string[]): boolean => {
	const cells = board.join("");
	const count = (player: string): number =>
		[...cells].filter((cell) => cell === player).length;
	const lines = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	const wins = (player: string): boolean =>
		lines.some((line) => line.every((i) => cells.charAt(i) === player));

	const x = count("X");
	const o = count("O");
	if (x !== o && x !== o + 1) return false;
	if (wins("X") && x !== o + 1) return false;
	if (wins("O") && x !== o) return false;
	return true;
};
