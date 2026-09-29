/**
 * 59. Spiral Matrix II
 *
 * Returns an n×n matrix filled with 1 to n² in clockwise spiral order,
 * starting from the top-left corner.
 *
 * Fills the outer ring (top row, right column, bottom row, left column), then
 * shrinks the boundaries and repeats.
 *
 * @see https://leetcode.com/problems/spiral-matrix-ii/
 * @difficulty Medium
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1) excluding the returned matrix
 *
 * @example
 * spiralMatrixII(3); // [[1, 2, 3], [8, 9, 4], [7, 6, 5]]
 */
export const spiralMatrixII = (n: number): number[][] => {
	const matrix = Array.from({ length: n }, () => new Array<number>(n).fill(0));
	const set = (row: number, column: number, value: number): void => {
		const cells = matrix[row];
		if (cells) cells[column] = value;
	};

	let value = 1;
	for (let layer = 0; layer < Math.ceil(n / 2); layer++) {
		const last = n - 1 - layer;
		if (layer === last) {
			set(layer, layer, value);
			break;
		}
		for (let c = layer; c < last; c++) set(layer, c, value++);
		for (let r = layer; r < last; r++) set(r, last, value++);
		for (let c = last; c > layer; c--) set(last, c, value++);
		for (let r = last; r > layer; r--) set(r, layer, value++);
	}

	return matrix;
};
