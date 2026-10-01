/**
 * 999. Available Captures for Rook
 *
 * On an 8 × 8 board with one white rook `R`, white bishops `B` and black
 * pawns `p`, returns how many pawns the rook attacks: the first piece in
 * each direction, if it's a pawn.
 *
 * Finds the rook and looks along each of the four directions until the
 * first piece or the edge.
 *
 * @see https://leetcode.com/problems/available-captures-for-rook/
 * @difficulty Easy
 * @timeComplexity O(64)
 * @spaceComplexity O(1)
 *
 * @example
 * availableCapturesForRook(board); // the number of pawns in the rook's lines of sight
 */
export const availableCapturesForRook = (
	board: readonly (readonly string[])[],
): number => {
	let [rookRow, rookCol] = [0, 0];
	for (const [r, row] of board.entries()) {
		const c = row.indexOf("R");
		if (c !== -1) [rookRow, rookCol] = [r, c];
	}

	let captures = 0;
	for (const [dr, dc] of [
		[-1, 0],
		[1, 0],
		[0, -1],
		[0, 1],
	] as const) {
		for (
			let r = rookRow + dr, c = rookCol + dc;
			board[r]?.[c] !== undefined;
			r += dr, c += dc
		) {
			const square = board[r]?.[c];
			if (square === ".") continue;
			if (square === "p") captures++;
			break;
		}
	}
	return captures;
};
