/**
 * 1030. Matrix Cells in Distance Order
 *
 * Returns every cell of a `rows × cols` matrix, ordered by Manhattan
 * distance from `(rCenter, cCenter)`, nearest first (ties in any order).
 *
 * Lists the cells and sorts them by distance.
 *
 * @see https://leetcode.com/problems/matrix-cells-in-distance-order/
 * @difficulty Easy
 * @timeComplexity O(rows · cols · log(rows · cols))
 * @spaceComplexity O(rows · cols)
 *
 * @example
 * matrixCellsInDistanceOrder(1, 2, 0, 0); // [[0, 0], [0, 1]]
 */
export const matrixCellsInDistanceOrder = (
	rows: number,
	cols: number,
	rCenter: number,
	cCenter: number,
): number[][] => {
	const cells = Array.from({ length: rows * cols }, (_, i) => [
		Math.floor(i / cols),
		i % cols,
	]);
	const distance = ([r = 0, c = 0]: number[]) =>
		Math.abs(r - rCenter) + Math.abs(c - cCenter);
	return cells.sort((a, b) => distance(a) - distance(b));
};
