/**
 * 782. Transform to Chessboard
 *
 * Returns the fewest row swaps and column swaps that turn the `n × n`
 * binary `board` into a chessboard (no two neighbours equal), or -1 if it
 * can't be done.
 *
 * Swaps preserve which rows are equal or complementary, so a solvable board
 * has only two kinds of row, each the other's complement, in equal numbers
 * (off by one for odd `n`), and the same for columns; equivalently every
 * cell satisfies `board[0][0] ^ board[i][0] ^ board[0][j] ^ board[i][j] = 0`
 * and the first row and column are balanced. Rows and columns are then
 * independent: count the first column's mismatches against one alternating
 * pattern, and use whichever pattern the parity allows needing fewer
 * swaps (each swap fixes two mismatches).
 *
 * @see https://leetcode.com/problems/transform-to-chessboard/
 * @difficulty Hard
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * transformToChessboard([[0, 1, 1, 0], [0, 1, 1, 0], [1, 0, 0, 1], [1, 0, 0, 1]]); // 2
 */
export const transformToChessboard = (
	board: readonly (readonly number[])[],
): number => {
	const n = board.length;
	const at = (r: number, c: number): number => board[r]?.[c] ?? 0;
	for (let r = 0; r < n; r++) {
		for (let c = 0; c < n; c++)
			if ((at(0, 0) ^ at(r, 0) ^ at(0, c) ^ at(r, c)) !== 0) return -1;
	}

	const swapsFor = (line: (i: number) => number): number => {
		let ones = 0;
		let mismatches = 0;
		for (let i = 0; i < n; i++) {
			ones += line(i);
			if (line(i) === i % 2) mismatches++;
		}
		if (ones !== Math.floor(n / 2) && ones !== Math.ceil(n / 2)) return -1;
		if (n % 2 === 1)
			return (mismatches % 2 === 0 ? mismatches : n - mismatches) / 2;
		return Math.min(mismatches, n - mismatches) / 2;
	};

	const rowSwaps = swapsFor((i) => at(i, 0));
	const colSwaps = swapsFor((i) => at(0, i));
	return rowSwaps === -1 || colSwaps === -1 ? -1 : rowSwaps + colSwaps;
};
