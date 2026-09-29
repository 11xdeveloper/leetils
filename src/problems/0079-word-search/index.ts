/**
 * 79. Word Search
 *
 * Returns whether `word` can be spelled on the grid of letters `board` by a
 * path of horizontally or vertically adjacent cells, using each cell at most
 * once.
 *
 * Depth-first search from every cell, backtracking on a mismatch. Two checks
 * prune the search first: the board must have enough of each letter, and
 * the word is searched from whichever end has the rarer letter, which gives
 * fewer starting cells.
 *
 * @see https://leetcode.com/problems/word-search/
 * @difficulty Medium
 * @timeComplexity O(m * n * 3^L) where L is the length of the word
 * @spaceComplexity O(m * n)
 *
 * @example
 * wordSearch([["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]], "ABCCED"); // true
 */
export const wordSearch = (
	board: readonly (readonly string[])[],
	word: string,
): boolean => {
	const rows = board.length;
	const columns = board[0]?.length ?? 0;

	const available = new Map<string, number>();
	for (const row of board) {
		for (const cell of row) available.set(cell, (available.get(cell) ?? 0) + 1);
	}
	const needed = new Map<string, number>();
	for (const char of word) needed.set(char, (needed.get(char) ?? 0) + 1);
	for (const [char, count] of needed) {
		if ((available.get(char) ?? 0) < count) return false;
	}

	const first = word.charAt(0);
	const last = word.charAt(word.length - 1);
	const target =
		(available.get(last) ?? 0) < (available.get(first) ?? 0)
			? [...word].reverse().join("")
			: word;

	const used = new Uint8Array(rows * columns);

	const search = (r: number, c: number, i: number): boolean => {
		if (i === target.length) return true;
		if (r < 0 || r >= rows || c < 0 || c >= columns) return false;
		if (used[r * columns + c] === 1 || board[r]?.[c] !== target[i])
			return false;

		used[r * columns + c] = 1;
		const found =
			search(r + 1, c, i + 1) ||
			search(r - 1, c, i + 1) ||
			search(r, c + 1, i + 1) ||
			search(r, c - 1, i + 1);
		used[r * columns + c] = 0;
		return found;
	};

	for (let r = 0; r < rows; r++) {
		for (let c = 0; c < columns; c++) {
			if (search(r, c, 0)) return true;
		}
	}
	return false;
};
