/**
 * 688. Knight Probability in Chessboard
 *
 * A knight on an `n × n` board, starting at `(row, column)`, makes `k`
 * moves, each chosen uniformly from its 8 knight moves (even ones leaving
 * the board). Returns the probability it's still on the board afterwards.
 *
 * DP over moves: the probability of being on each square, spreading an
 * eighth of each square's probability to each move that stays on the
 * board.
 *
 * @see https://leetcode.com/problems/knight-probability-in-chessboard/
 * @difficulty Medium
 * @timeComplexity O(k · n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * knightProbabilityInChessboard(3, 2, 0, 0); // 0.0625
 */
export const knightProbabilityInChessboard = (
	n: number,
	k: number,
	row: number,
	column: number,
): number => {
	const moves = [
		[1, 2],
		[2, 1],
		[2, -1],
		[1, -2],
		[-1, -2],
		[-2, -1],
		[-2, 1],
		[-1, 2],
	] as const;
	let board = new Array<number>(n * n).fill(0);
	board[row * n + column] = 1;

	for (let move = 0; move < k; move++) {
		const next = new Array<number>(n * n).fill(0);
		for (let r = 0; r < n; r++) {
			for (let c = 0; c < n; c++) {
				const probability = board[r * n + c] ?? 0;
				if (probability === 0) continue;
				for (const [dr, dc] of moves) {
					const [r2, c2] = [r + dr, c + dc];
					if (r2 >= 0 && r2 < n && c2 >= 0 && c2 < n)
						next[r2 * n + c2] = (next[r2 * n + c2] ?? 0) + probability / 8;
				}
			}
		}
		board = next;
	}

	return board.reduce((total, probability) => total + probability, 0);
};
