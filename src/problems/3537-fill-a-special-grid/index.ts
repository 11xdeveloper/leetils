/**
 * 3537. Fill a Special Grid
 *
 * Fill a 2ⁿ × 2ⁿ grid with 0 to 4ⁿ - 1 so that, recursively, the top-right
 * quadrant holds the smallest numbers, then the bottom-right, then the
 * bottom-left, then the top-left.
 *
 * Recurse into the quadrants in that order, handing out consecutive
 * ranges.
 *
 * @see https://leetcode.com/problems/fill-a-special-grid/
 * @difficulty Medium
 * @timeComplexity O(4ⁿ)
 * @spaceComplexity O(4ⁿ)
 *
 * @example
 * fillASpecialGrid(1); // [[3, 0], [2, 1]]
 */
export const fillASpecialGrid = (n: number): number[][] => {
	const side = 2 ** n;
	const grid = Array.from({ length: side }, () =>
		new Array<number>(side).fill(0),
	);
	const fill = (
		top: number,
		left: number,
		size: number,
		start: number,
	): void => {
		if (size === 1) {
			const row = grid[top];
			if (row) row[left] = start;
			return;
		}
		const half = size / 2;
		const block = half * half;
		fill(top, left + half, half, start);
		fill(top + half, left + half, half, start + block);
		fill(top + half, left, half, start + 2 * block);
		fill(top, left, half, start + 3 * block);
	};
	fill(0, 0, side, 0);
	return grid;
};
