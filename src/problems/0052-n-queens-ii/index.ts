/**
 * 52. N-Queens II
 *
 * Returns how many ways there are to place `n` queens on an n×n chessboard so
 * that no two attack each other.
 *
 * Places one queen per row, backtracking when a row has no safe square. The
 * attacked columns and diagonals are bitmasks: shifting the diagonal masks by
 * one each row moves the attacks along the diagonals, so the safe squares in
 * a row are a single bitwise expression.
 *
 * @see https://leetcode.com/problems/n-queens-ii/
 * @difficulty Hard
 * @timeComplexity O(n!)
 * @spaceComplexity O(n)
 *
 * @example
 * nQueensII(4); // 2
 */
export const nQueensII = (n: number): number => {
	const all = (1 << n) - 1;

	const count = (
		columns: number,
		diagonals: number,
		antiDiagonals: number,
	): number => {
		if (columns === all) return 1;

		let solutions = 0;
		let safe = all & ~(columns | diagonals | antiDiagonals);
		while (safe !== 0) {
			const square = safe & -safe;
			safe ^= square;
			solutions += count(
				columns | square,
				((diagonals | square) << 1) & all,
				(antiDiagonals | square) >> 1,
			);
		}
		return solutions;
	};

	return count(0, 0, 0);
};
