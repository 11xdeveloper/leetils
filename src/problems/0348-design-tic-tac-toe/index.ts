/**
 * 348. Design Tic-Tac-Toe
 *
 * Plays tic-tac-toe on an n×n board between players 1 and 2, returning the
 * winner after each move, or 0 if there's none yet. A player wins with n
 * marks in a row, column or either diagonal. Moves are always valid.
 *
 * Instead of a board, keeps one counter per row, per column and per
 * diagonal: player 1 adds 1 and player 2 subtracts 1. A line reaches `n` or
 * `-n` only when one player fills it, so each move is O(1), as the
 * follow-up asks.
 *
 * @see https://leetcode.com/problems/design-tic-tac-toe/
 * @difficulty Medium
 * @timeComplexity O(1) per move
 * @spaceComplexity O(n)
 *
 * @example
 * const game = new DesignTicTacToe(3);
 * game.move(0, 0, 1); // 0
 * // … until a player fills a line, when move returns that player
 */
export class DesignTicTacToe {
	readonly #n: number;
	readonly #rows: number[];
	readonly #columns: number[];
	#diagonal = 0;
	#antiDiagonal = 0;

	constructor(n: number) {
		this.#n = n;
		this.#rows = new Array<number>(n).fill(0);
		this.#columns = new Array<number>(n).fill(0);
	}

	/** Places `player`'s mark at (row, col) and returns the winner, or 0. */
	move(row: number, col: number, player: number): number {
		const delta = player === 1 ? 1 : -1;
		this.#rows[row] = (this.#rows[row] ?? 0) + delta;
		this.#columns[col] = (this.#columns[col] ?? 0) + delta;
		if (row === col) this.#diagonal += delta;
		if (row + col === this.#n - 1) this.#antiDiagonal += delta;

		const target = delta * this.#n;
		return this.#rows[row] === target ||
			this.#columns[col] === target ||
			this.#diagonal === target ||
			this.#antiDiagonal === target
			? player
			: 0;
	}
}
