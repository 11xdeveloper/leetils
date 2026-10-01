/**
 * 885. Spiral Matrix III
 *
 * Starting at `(rStart, cStart)` facing east in a `rows × cols` grid, walks
 * a clockwise spiral outwards (leaving and re-entering the grid as needed)
 * until every cell is visited. Returns the grid cells in the order visited.
 *
 * The spiral's legs grow 1, 1, 2, 2, 3, 3, …, turning right after each.
 * Positions outside the grid are walked through but not recorded.
 *
 * @see https://leetcode.com/problems/spiral-matrix-iii/
 * @difficulty Medium
 * @timeComplexity O(max(rows, cols)^2)
 * @spaceComplexity O(rows · cols) for the result
 *
 * @example
 * spiralMatrixIII(1, 4, 0, 0); // [[0, 0], [0, 1], [0, 2], [0, 3]]
 */
export const spiralMatrixIII = (
	rows: number,
	cols: number,
	rStart: number,
	cStart: number,
): number[][] => {
	const directions = [
		[0, 1],
		[1, 0],
		[0, -1],
		[-1, 0],
	] as const;
	const visited = [[rStart, cStart]];
	let [r, c] = [rStart, cStart];
	for (let leg = 0; visited.length < rows * cols; leg++) {
		const [dr, dc] = directions[leg % 4] ?? [0, 0];
		const length = Math.floor(leg / 2) + 1;
		for (let step = 0; step < length; step++) {
			r += dr;
			c += dc;
			if (r >= 0 && r < rows && c >= 0 && c < cols) visited.push([r, c]);
		}
	}
	return visited;
};
