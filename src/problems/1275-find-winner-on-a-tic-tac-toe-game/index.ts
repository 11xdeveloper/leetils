/**
 * 1275. Find Winner on a Tic Tac Toe Game
 *
 * Plays the valid tic-tac-toe `moves` (A first) and returns `"A"` or `"B"`
 * if someone won, `"Draw"` if the board filled up, or `"Pending"`.
 *
 * Only the last player to move can have won. Their moves count +1 on each
 * row, column and diagonal they touch; a line reaching 3 is a win.
 *
 * @see https://leetcode.com/problems/find-winner-on-a-tic-tac-toe-game/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * findWinnerOnATicTacToeGame([[0, 0], [2, 0], [1, 1], [2, 1], [2, 2]]); // "A"
 */
export const findWinnerOnATicTacToeGame = (
	moves: readonly (readonly number[])[],
): string => {
	const last = (moves.length - 1) % 2;
	// Lines: rows 0–2, columns 3–5, the diagonal 6 and the anti-diagonal 7.
	const lines = new Array<number>(8).fill(0);
	moves.forEach(([r = 0, c = 0], i) => {
		if (i % 2 !== last) return;
		const touched = [r, 3 + c];
		if (r === c) touched.push(6);
		if (r + c === 2) touched.push(7);
		for (const line of touched) lines[line] = (lines[line] ?? 0) + 1;
	});
	if (lines.includes(3)) return last === 0 ? "A" : "B";
	return moves.length === 9 ? "Draw" : "Pending";
};
