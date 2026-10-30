/**
 * 2661. First Completely Painted Row or Column
 *
 * `arr` lists the order in which the cells of `mat` holding each value
 * are painted. Returns the first index of `arr` at which some row or
 * column is fully painted.
 *
 * Map each value to its cell and count painted cells per row and column.
 *
 * @see https://leetcode.com/problems/first-completely-painted-row-or-column/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m · n)
 *
 * @example
 * firstCompletelyPaintedRowOrColumn([1, 3, 4, 2], [[1, 4], [2, 3]]); // 2
 */
export const firstCompletelyPaintedRowOrColumn = (
	arr: readonly number[],
	mat: readonly (readonly number[])[],
): number => {
	const rows = mat.length;
	const cols = mat[0]?.length ?? 0;
	const cellOf: [number, number][] = [];
	for (const [r, row] of mat.entries())
		for (const [c, value] of row.entries()) cellOf[value] = [r, c];
	const rowPainted = Array.from({ length: rows }, () => 0);
	const colPainted = Array.from({ length: cols }, () => 0);
	for (const [i, value] of arr.entries()) {
		const [r, c] = cellOf[value] ?? [0, 0];
		rowPainted[r] = (rowPainted[r] ?? 0) + 1;
		colPainted[c] = (colPainted[c] ?? 0) + 1;
		if (rowPainted[r] === cols || colPainted[c] === rows) return i;
	}
	return -1;
};
