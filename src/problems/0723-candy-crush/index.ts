/**
 * 723. Candy Crush
 *
 * Settles a Candy Crush board (0 is empty): repeatedly, every run of three
 * or more equal candies in a row or column is crushed at once, then the
 * candies above empty cells fall down. Returns the stable board, which is
 * `board` itself, modified in place.
 *
 * Each round marks every cell in a horizontal or vertical run of three,
 * clears them together, then compacts each column downwards. It stops when
 * a round crushes nothing.
 *
 * @see https://leetcode.com/problems/candy-crush/
 * @difficulty Medium
 * @timeComplexity O((m · n)^2) in the worst case: O(m · n) per round, O(m · n) rounds
 * @spaceComplexity O(m · n)
 *
 * @example
 * candyCrush([[1, 3, 5, 5, 2], [3, 4, 3, 3, 1], [3, 2, 4, 5, 2], [2, 4, 4, 5, 5], [1, 4, 4, 1, 1]]);
 * // [[1, 3, 0, 0, 0], [3, 4, 0, 5, 2], [3, 2, 0, 3, 1], [2, 4, 0, 5, 2], [1, 4, 3, 1, 1]]
 */
export const candyCrush = (board: number[][]): number[][] => {
	const m = board.length;
	const n = board[0]?.length ?? 0;
	const at = (r: number, c: number): number => board[r]?.[c] ?? 0;

	for (;;) {
		const crush = new Uint8Array(m * n);
		let found = false;
		for (let r = 0; r < m; r++) {
			for (let c = 0; c < n; c++) {
				const candy = at(r, c);
				if (candy === 0) continue;
				if (c + 2 < n && at(r, c + 1) === candy && at(r, c + 2) === candy) {
					crush.fill(1, r * n + c, r * n + c + 3);
					found = true;
				}
				if (r + 2 < m && at(r + 1, c) === candy && at(r + 2, c) === candy) {
					for (let k = 0; k < 3; k++) crush[(r + k) * n + c] = 1;
					found = true;
				}
			}
		}
		if (!found) return board;

		for (let c = 0; c < n; c++) {
			let write = m - 1;
			for (let r = m - 1; r >= 0; r--) {
				if (crush[r * n + c]) continue;
				const row = board[write--];
				if (row) row[c] = at(r, c);
			}
			for (; write >= 0; write--) {
				const row = board[write];
				if (row) row[c] = 0;
			}
		}
	}
};
