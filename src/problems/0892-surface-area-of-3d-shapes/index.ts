/**
 * 892. Surface Area of 3D Shapes
 *
 * `grid[i][j]` unit cubes are stacked on each cell, glued to their
 * neighbours. Returns the total surface area of the resulting shapes,
 * including the bottoms.
 *
 * Each non-empty stack exposes its top, bottom and four sides; each pair of
 * neighbouring stacks hides twice their shorter height.
 *
 * @see https://leetcode.com/problems/surface-area-of-3d-shapes/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * surfaceAreaOf3dShapes([[1, 2], [3, 4]]); // 34
 */
export const surfaceAreaOf3dShapes = (
	grid: readonly (readonly number[])[],
): number => {
	let area = 0;
	for (const [r, row] of grid.entries()) {
		for (const [c, height] of row.entries()) {
			if (height > 0) area += 4 * height + 2;
			area -= 2 * Math.min(height, grid[r - 1]?.[c] ?? 0);
			area -= 2 * Math.min(height, row[c - 1] ?? 0);
		}
	}
	return area;
};
