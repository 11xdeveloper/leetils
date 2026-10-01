/**
 * 36. Valid Sudoku
 *
 * Returns whether a partly filled 9×9 Sudoku board is valid so far: no digit
 * repeats within a row, a column or a 3×3 box. Empty cells are `"."`. The
 * board doesn't need to be solvable.
 *
 * Records each digit's row, column and box in a set as it goes, and fails as
 * soon as one has been seen before.
 *
 * @see https://leetcode.com/problems/valid-sudoku/
 * @difficulty Medium
 * @timeComplexity O(1), since the board always has 81 cells
 * @spaceComplexity O(1)
 *
 * @example
 * validSudoku(board); // true if no row, column or box repeats a digit
 */
export const validSudoku = (board: readonly (readonly string[])[]): boolean => {
	const seen = new Set<string>();

	for (const [r, row] of board.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === ".") continue;

			const box = Math.floor(r / 3) * 3 + Math.floor(c / 3);
			const keys = [
				`${cell} in row ${r}`,
				`${cell} in column ${c}`,
				`${cell} in box ${box}`,
			];
			if (keys.some((key) => seen.has(key))) return false;
			for (const key of keys) seen.add(key);
		}
	}

	return true;
};
