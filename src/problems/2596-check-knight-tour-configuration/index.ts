/**
 * 2596. Check Knight Tour Configuration
 *
 * `grid[r][c]` is the step at which a knight, starting in the top-left,
 * visits that cell. Returns whether this describes a valid tour.
 *
 * Locate each step's cell and check consecutive steps are a knight's
 * move apart.
 *
 * @see https://leetcode.com/problems/check-knight-tour-configuration/
 * @difficulty Medium
 * @timeComplexity O(n²)
 * @spaceComplexity O(n²)
 *
 * @example
 * checkKnightTourConfiguration([[0, 3, 6], [5, 8, 1], [2, 7, 4]]); // false
 */
export const checkKnightTourConfiguration = (
	grid: readonly (readonly number[])[],
): boolean => {
	const cells: [number, number][] = [];
	for (const [r, row] of grid.entries())
		for (const [c, step] of row.entries()) cells[step] = [r, c];
	if (grid[0]?.[0] !== 0) return false;
	for (let step = 1; step < cells.length; step++) {
		const [r1, c1] = cells[step - 1] ?? [0, 0];
		const [r2, c2] = cells[step] ?? [0, 0];
		if (Math.abs(r1 - r2) * Math.abs(c1 - c2) !== 2) return false;
	}
	return true;
};
