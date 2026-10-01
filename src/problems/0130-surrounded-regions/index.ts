/**
 * 130. Surrounded Regions
 *
 * On a board of `"X"` and `"O"`, captures every region of `"O"`s that is
 * surrounded by `"X"`s by flipping it to `"X"`, in place, as the problem
 * requires. A region touching the board's edge is not surrounded.
 *
 * Instead of finding surrounded regions, finds the ones that escape: a
 * breadth-first search from every `"O"` on the edge marks the cells it
 * reaches as safe. Every other `"O"` is then captured.
 *
 * @see https://leetcode.com/problems/surrounded-regions/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * surroundedRegions(board); // flips the enclosed "O"s to "X"
 */
export const surroundedRegions = (board: string[][]): void => {
	const rows = board.length;
	const columns = board[0]?.length ?? 0;
	const safe = new Uint8Array(rows * columns);
	const queue: [number, number][] = [];

	const reach = (r: number, c: number): void => {
		if (r < 0 || r >= rows || c < 0 || c >= columns) return;
		if (board[r]?.[c] !== "O" || safe[r * columns + c] === 1) return;
		safe[r * columns + c] = 1;
		queue.push([r, c]);
	};

	for (let r = 0; r < rows; r++) {
		reach(r, 0);
		reach(r, columns - 1);
	}
	for (let c = 0; c < columns; c++) {
		reach(0, c);
		reach(rows - 1, c);
	}

	for (let head = 0; head < queue.length; head++) {
		const [r, c] = queue[head] ?? [0, 0];
		reach(r + 1, c);
		reach(r - 1, c);
		reach(r, c + 1);
		reach(r, c - 1);
	}

	for (const [r, row] of board.entries()) {
		for (const c of row.keys()) {
			if (row[c] === "O" && safe[r * columns + c] === 0) row[c] = "X";
		}
	}
};
