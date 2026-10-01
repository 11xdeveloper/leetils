/**
 * 883. Projection Area of 3D Shapes
 *
 * `grid[i][j]` cubes are stacked on each cell. Returns the total area of
 * the shadows cast onto the three axis planes.
 *
 * The top view counts non-empty cells; the two side views sum each row's
 * and each column's tallest stack.
 *
 * @see https://leetcode.com/problems/projection-area-of-3d-shapes/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * projectionAreaOf3dShapes([[1, 2], [3, 4]]); // 17
 */
export const projectionAreaOf3dShapes = (
	grid: readonly (readonly number[])[],
): number => {
	let area = 0;
	for (const row of grid) {
		area += row.filter((height) => height > 0).length;
		area += Math.max(0, ...row);
	}
	for (let c = 0; c < (grid[0]?.length ?? 0); c++)
		area += Math.max(0, ...grid.map((row) => row[c] ?? 0));
	return area;
};
