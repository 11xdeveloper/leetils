/**
 * 2624. Snail Traversal
 *
 * `Array.prototype.snail(rowsCount, colsCount)`: fill a `rowsCount` ×
 * `colsCount` matrix with the array's elements, going down the first column,
 * up the second, down the third and so on. Returns an empty array if the
 * sizes don't match. Install it with `Array.prototype.snail =
 * snailTraversal`, or call it with `snailTraversal.call(array, rows, cols)`.
 *
 * Element i goes in column ⌊i / rows⌋, at row i mod rows when the column is
 * even and counting up from the bottom when it's odd.
 *
 * @see https://leetcode.com/problems/snail-traversal/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * snailTraversal.call([1, 2, 3, 4], 2, 2); // [[1, 4], [2, 3]]
 */
export function snailTraversal(
	this: readonly number[],
	rowsCount: number,
	colsCount: number,
): number[][] {
	if (rowsCount * colsCount !== this.length) return [];
	const matrix = Array.from({ length: rowsCount }, () =>
		new Array<number>(colsCount).fill(0),
	);
	this.forEach((value, i) => {
		const col = Math.floor(i / rowsCount);
		const step = i % rowsCount;
		const row = col % 2 === 0 ? step : rowsCount - 1 - step;
		const cells = matrix[row];
		if (cells) cells[col] = value;
	});
	return matrix;
}
