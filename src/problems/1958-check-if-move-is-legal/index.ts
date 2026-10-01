/**
 * 1958. Check if Move is Legal
 *
 * Returns whether placing `color` at `(rMove, cMove)` on the 8 × 8 board
 * is legal: in some direction it must end a line of at least three cells
 * whose ends have `color` and whose middle is all the opposite colour.
 *
 * Walk each of the eight directions over opposite-coloured cells and
 * check what ends the run.
 *
 * @see https://leetcode.com/problems/check-if-move-is-legal/
 * @difficulty Medium
 * @timeComplexity O(8 · 8)
 * @spaceComplexity O(1)
 *
 * @example
 * checkIfMoveIsLegal(board, 4, 3, "B"); // true for the first example's board
 */
export const checkIfMoveIsLegal = (
	board: readonly (readonly string[])[],
	rMove: number,
	cMove: number,
	color: string,
): boolean => {
	for (let dr = -1; dr <= 1; dr++) {
		for (let dc = -1; dc <= 1; dc++) {
			if (dr === 0 && dc === 0) continue;
			let [r, c, length] = [rMove + dr, cMove + dc, 1];
			while (
				board[r]?.[c] !== undefined &&
				board[r]?.[c] !== "." &&
				board[r]?.[c] !== color
			) {
				[r, c, length] = [r + dr, c + dc, length + 1];
			}
			if (length >= 2 && board[r]?.[c] === color) return true;
		}
	}
	return false;
};
