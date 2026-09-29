/**
 * 51. N-Queens
 *
 * Returns every way to place `n` queens on an n×n chessboard so that no two
 * attack each other. Each board is a list of rows, with `Q` for a queen and
 * `.` for an empty square.
 *
 * Places one queen per row, backtracking whenever a row has no square free
 * from attack. Sets of used columns and diagonals make each check constant
 * time: squares on the same diagonal share `row - column` or `row + column`.
 *
 * @see https://leetcode.com/problems/n-queens/
 * @difficulty Hard
 * @timeComplexity O(n!)
 * @spaceComplexity O(n) excluding the returned boards
 *
 * @example
 * nQueens(4); // [[".Q..", "...Q", "Q...", "..Q."], ["..Q.", "Q...", "...Q", ".Q.."]]
 */
export const nQueens = (n: number): string[][] => {
	const boards: string[][] = [];
	const queenColumns: number[] = [];
	const columns = new Set<number>();
	const diagonals = new Set<number>();
	const antiDiagonals = new Set<number>();

	const place = (row: number): void => {
		if (row === n) {
			boards.push(
				queenColumns.map(
					(column) => ".".repeat(column) + "Q" + ".".repeat(n - column - 1),
				),
			);
			return;
		}

		for (let column = 0; column < n; column++) {
			if (
				columns.has(column) ||
				diagonals.has(row - column) ||
				antiDiagonals.has(row + column)
			) {
				continue;
			}

			queenColumns.push(column);
			columns.add(column);
			diagonals.add(row - column);
			antiDiagonals.add(row + column);
			place(row + 1);
			queenColumns.pop();
			columns.delete(column);
			diagonals.delete(row - column);
			antiDiagonals.delete(row + column);
		}
	};

	place(0);
	return boards;
};
