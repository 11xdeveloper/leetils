const ALL_DIGITS = 0b1111111110; // bits 1–9

const countBits = (mask: number): number => {
	let count = 0;
	for (let rest = mask; rest !== 0; rest &= rest - 1) count++;
	return count;
};

/**
 * 37. Sudoku Solver
 *
 * Solves a 9×9 Sudoku puzzle by filling in its empty `"."` cells, in place,
 * as the problem requires. The puzzle has exactly one solution.
 *
 * Backtracking search. Each row, column and box keeps a bitmask of the digits
 * it already holds, so a cell's candidates can be found in constant time.
 * Each step fills the empty cell with the fewest candidates, which prunes the
 * search far more than filling cells in order.
 *
 * @see https://leetcode.com/problems/sudoku-solver/
 * @difficulty Hard
 * @timeComplexity O(9^m) in the worst case, where m is the number of empty cells
 * @spaceComplexity O(m)
 *
 * @example
 * sudokuSolver(board); // board is now solved
 */
export const sudokuSolver = (board: string[][]): void => {
	const rows = new Array<number>(9).fill(0);
	const columns = new Array<number>(9).fill(0);
	const boxes = new Array<number>(9).fill(0);
	const empty: [row: number, column: number][] = [];
	const boxOf = (r: number, c: number): number =>
		Math.floor(r / 3) * 3 + Math.floor(c / 3);

	const toggle = (r: number, c: number, digit: number): void => {
		const bit = 1 << digit;
		rows[r] = (rows[r] ?? 0) ^ bit;
		columns[c] = (columns[c] ?? 0) ^ bit;
		boxes[boxOf(r, c)] = (boxes[boxOf(r, c)] ?? 0) ^ bit;
	};

	const candidates = (r: number, c: number): number =>
		ALL_DIGITS &
		~((rows[r] ?? 0) | (columns[c] ?? 0) | (boxes[boxOf(r, c)] ?? 0));

	for (const [r, row] of board.entries()) {
		for (const [c, cell] of row.entries()) {
			if (cell === ".") empty.push([r, c]);
			else toggle(r, c, Number(cell));
		}
	}

	const solve = (): boolean => {
		let best: [number, number] | undefined;
		let bestCandidates = 0;
		let bestCount = 10;

		for (const [r, c] of empty) {
			if (board[r]?.[c] !== ".") continue;
			const cellCandidates = candidates(r, c);
			const count = countBits(cellCandidates);
			if (count < bestCount) {
				best = [r, c];
				bestCandidates = cellCandidates;
				bestCount = count;
				if (count <= 1) break;
			}
		}

		if (!best) return true;

		const [r, c] = best;
		const row = board[r];
		if (!row) return false;

		for (let digit = 1; digit <= 9; digit++) {
			if ((bestCandidates & (1 << digit)) === 0) continue;

			row[c] = String(digit);
			toggle(r, c, digit);
			if (solve()) return true;
			toggle(r, c, digit);
			row[c] = ".";
		}

		return false;
	};

	solve();
};
