/**
 * 529. Minesweeper
 *
 * Plays one click on a Minesweeper board and returns the board, which is
 * updated in place as the problem requires. Cells are `M` (hidden mine),
 * `E` (hidden empty), `B` (revealed blank), a digit (revealed, with that many
 * neighbouring mines) or `X` (revealed mine).
 *
 * Clicking a mine reveals it as `X`. Clicking an empty cell reveals it as
 * its count of neighbouring mines, or, if there are none, as `B` and also
 * reveals all its hidden neighbours the same way. The spreading uses a
 * queue rather than recursion, since a board can have 2,500 cells.
 *
 * @see https://leetcode.com/problems/minesweeper/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * minesweeper([["E", "M"], ["E", "E"]], [1, 0]); // [["E", "M"], ["1", "E"]]
 */
export const minesweeper = (
	board: string[][],
	click: readonly number[],
): string[][] => {
	const [clickRow = 0, clickCol = 0] = click;
	const clicked = board[clickRow];
	if (clicked?.[clickCol] === "M") {
		clicked[clickCol] = "X";
		return board;
	}

	const neighbours = (row: number, col: number): [number, number][] => {
		const cells: [number, number][] = [];
		for (let dr = -1; dr <= 1; dr++) {
			for (let dc = -1; dc <= 1; dc++) {
				if ((dr !== 0 || dc !== 0) && board[row + dr]?.[col + dc] !== undefined)
					cells.push([row + dr, col + dc]);
			}
		}
		return cells;
	};

	const queue: [number, number][] = [[clickRow, clickCol]];
	if (clicked) clicked[clickCol] = "B";
	for (const [row, col] of queue) {
		const around = neighbours(row, col);
		const mines = around.filter(([r, c]) => board[r]?.[c] === "M").length;
		const cells = board[row];
		if (!cells) continue;
		if (mines > 0) {
			cells[col] = String(mines);
			continue;
		}
		for (const [r, c] of around) {
			const neighbourRow = board[r];
			if (neighbourRow?.[c] === "E") {
				neighbourRow[c] = "B";
				queue.push([r, c]);
			}
		}
	}

	return board;
};
