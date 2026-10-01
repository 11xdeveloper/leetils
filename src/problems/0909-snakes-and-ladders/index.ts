/**
 * 909. Snakes and Ladders
 *
 * Squares 1 to `n²` of the `n × n` board are numbered from the bottom-left,
 * alternating direction each row. A roll moves 1 to 6 squares; landing on a
 * snake or ladder's start (`board[r][c] ≠ -1`) moves you to its end, only
 * once per roll. Returns the fewest rolls from square 1 to `n²`, or -1.
 *
 * Breadth-first search over squares, converting each square number to its
 * row and column.
 *
 * @see https://leetcode.com/problems/snakes-and-ladders/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(n^2)
 *
 * @example
 * snakesAndLadders([[-1, -1], [-1, 3]]); // 1
 */
export const snakesAndLadders = (
	board: readonly (readonly number[])[],
): number => {
	const n = board.length;
	const target = n * n;
	const destination = (square: number): number => {
		const index = square - 1;
		const rowFromBottom = Math.floor(index / n);
		const offset = index % n;
		const col = rowFromBottom % 2 === 0 ? offset : n - 1 - offset;
		const jump = board[n - 1 - rowFromBottom]?.[col] ?? -1;
		return jump === -1 ? square : jump;
	};

	const seen = new Uint8Array(target + 1);
	seen[1] = 1;
	let frontier = [1];
	for (let rolls = 0; frontier.length > 0; rolls++) {
		const next: number[] = [];
		for (const square of frontier) {
			if (square === target) return rolls;
			for (let roll = 1; roll <= 6 && square + roll <= target; roll++) {
				const landed = destination(square + roll);
				if (seen[landed]) continue;
				seen[landed] = 1;
				next.push(landed);
			}
		}
		frontier = next;
	}
	return -1;
};
