/**
 * 419. Battleships in a Board
 *
 * Counts the battleships on a board of `"X"` (ship) and `"."` (empty)
 * cells. Ships are straight horizontal or vertical lines, and no two ships
 * touch.
 *
 * Counts each ship once by its top-left cell: an `"X"` with no `"X"` above
 * it or to its left. One pass, with no extra memory and without modifying
 * the board, as the follow-up asks.
 *
 * @see https://leetcode.com/problems/battleships-in-a-board/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(1)
 *
 * @example
 * battleshipsInABoard([["X", ".", ".", "X"], [".", ".", ".", "X"], [".", ".", ".", "X"]]); // 2
 */
export const battleshipsInABoard = (
	board: readonly (readonly string[])[],
): number => {
	let ships = 0;
	for (const [r, row] of board.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === "X" && board[r - 1]?.[c] !== "X" && row[c - 1] !== "X")
				ships++;
		}
	}
	return ships;
};
