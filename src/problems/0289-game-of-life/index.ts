/**
 * 289. Game of Life
 *
 * Advances Conway's Game of Life by one generation on a board of live (1)
 * and dead (0) cells, in place, as the problem requires. Every cell updates
 * at the same time from its eight neighbours: a live cell survives with two
 * or three live neighbours, and a dead cell comes alive with exactly three.
 *
 * Stores each cell's next state in its second bit while the first bit still
 * holds the current state, so neighbours read the old generation. A final
 * pass shifts the new states into place. No copy of the board is needed.
 *
 * @see https://leetcode.com/problems/game-of-life/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(1)
 *
 * @example
 * const board = [[0, 1, 0], [0, 0, 1], [1, 1, 1], [0, 0, 0]];
 * gameOfLife(board); // board is now [[0, 0, 0], [1, 0, 1], [0, 1, 1], [0, 1, 0]]
 */
export const gameOfLife = (board: number[][]): void => {
	for (const [r, row] of board.entries()) {
		for (const [c, cell] of row.entries()) {
			let live = 0;
			for (let dr = -1; dr <= 1; dr++) {
				for (let dc = -1; dc <= 1; dc++) {
					if (dr !== 0 || dc !== 0) live += (board[r + dr]?.[c + dc] ?? 0) & 1;
				}
			}
			const alive = cell & 1;
			if (live === 3 || (alive && live === 2)) row[c] = cell | 2;
		}
	}

	for (const row of board) {
		for (const [c, cell] of row.entries()) row[c] = cell >> 1;
	}
};
