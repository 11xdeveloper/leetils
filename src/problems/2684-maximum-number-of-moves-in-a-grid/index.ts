/**
 * 2684. Maximum Number of Moves in a Grid
 *
 * Starting anywhere in the first column, each move goes one column right
 * to a diagonal or straight neighbour holding a strictly larger value.
 * Returns the most moves possible.
 *
 * Sweep column by column, tracking which rows are still reachable.
 *
 * @see https://leetcode.com/problems/maximum-number-of-moves-in-a-grid/
 * @difficulty Medium
 * @timeComplexity O(m · n)
 * @spaceComplexity O(m)
 *
 * @example
 * maximumNumberOfMovesInAGrid([[3, 2, 4], [2, 1, 9], [1, 1, 7]]); // 0
 */
export const maximumNumberOfMovesInAGrid = (
	grid: readonly (readonly number[])[],
): number => {
	const rows = grid.length;
	const cols = grid[0]?.length ?? 0;
	let reachable = Array.from({ length: rows }, () => true);
	for (let c = 1; c < cols; c++) {
		const next = Array.from({ length: rows }, (_, r) =>
			[r - 1, r, r + 1].some(
				(from) =>
					reachable[from] && (grid[from]?.[c - 1] ?? 0) < (grid[r]?.[c] ?? 0),
			),
		);
		if (!next.includes(true)) return c - 1;
		reachable = next;
	}
	return cols - 1;
};
