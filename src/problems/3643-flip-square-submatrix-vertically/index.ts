/**
 * 3643. Flip Square Submatrix Vertically
 *
 * Reverses the order of the rows of the k × k square of `grid` whose
 * top-left corner is (x, y), and returns the grid.
 *
 * @see https://leetcode.com/problems/flip-square-submatrix-vertically/
 * @difficulty Easy
 * @timeComplexity O(k²)
 * @spaceComplexity O(1)
 *
 * @example
 * flipSquareSubmatrixVertically([[3, 4, 2, 3], [2, 3, 4, 2]], 0, 2, 2); // [[3, 4, 4, 2], [2, 3, 2, 3]]
 */
export const flipSquareSubmatrixVertically = (
	grid: number[][],
	x: number,
	y: number,
	k: number,
): number[][] => {
	for (let top = x, bottom = x + k - 1; top < bottom; top++, bottom--) {
		const [a, b] = [grid[top] ?? [], grid[bottom] ?? []];
		for (let c = y; c < y + k; c++) [a[c], b[c]] = [b[c] ?? 0, a[c] ?? 0];
	}
	return grid;
};
