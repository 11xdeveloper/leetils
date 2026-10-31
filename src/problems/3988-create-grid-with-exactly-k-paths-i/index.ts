/**
 * 3988. Create Grid With Exactly K Paths I
 *
 * Builds an m × n grid of free cells and obstacles with exactly `k`
 * (at most 4) right-or-down paths from the top-left to the bottom-right,
 * or returns `[]` if none exists.
 *
 * A free 2 × k block in the corner has exactly k paths across it; leave
 * the rest of row 1 and then the last column free to reach the corner.
 * Without room for that, 4 paths still fit as two 2 × 2 blocks in a row
 * along the diagonal; transpose for tall grids. A single row or column
 * only ever has one path.
 *
 * @see https://leetcode.com/problems/create-grid-with-exactly-k-paths-i/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * createGridWithExactlyKPathsI(2, 3, 2); // ["..#", "..."]
 */
export const createGridWithExactlyKPathsI = (
	m: number,
	n: number,
	k: number,
): string[] => {
	const grid = (
		rows: number,
		columns: number,
		free: (r: number, c: number) => boolean,
	): string[] =>
		Array.from({ length: rows }, (_, r) =>
			Array.from({ length: columns }, (_, c) => (free(r, c) ? "." : "#")).join(
				"",
			),
		);
	const transpose = (rows: string[]): string[] =>
		Array.from({ length: rows[0]?.length ?? 0 }, (_, c) =>
			rows.map((row) => row[c]).join(""),
		);
	if (k === 1) return grid(m, n, (r, c) => r === 0 || c === n - 1);
	if (m < 2 || n < 2) return [];
	// A 2 × k block, then along row 1 and down the last column.
	const block = (rows: number, columns: number) =>
		grid(
			rows,
			columns,
			(r, c) =>
				(r <= 1 && c < k) ||
				(r === 1 && c >= k - 1) ||
				(r >= 1 && c === columns - 1),
		);
	if (n >= k) return block(m, n);
	if (m >= k) return transpose(block(n, m));
	if (k === 4 && m >= 3 && n >= 3)
		return grid(
			m,
			n,
			(r, c) =>
				(r <= 1 && c <= 1) ||
				(r >= 1 && r <= 2 && c >= 1 && c <= 2) ||
				(r === 2 && c >= 2) ||
				(r >= 2 && c === n - 1),
		);
	return [];
};
