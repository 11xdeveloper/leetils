/**
 * 1706. Where Will the Ball Fall
 *
 * Each cell of `grid` holds a board sloping right (1) or left (-1). For a
 * ball dropped into each column, returns the column it falls out of, or
 * -1 if it gets stuck.
 *
 * Follow each ball row by row: it moves in its cell's direction, and gets
 * stuck at a wall or a V formed with the neighbouring board.
 *
 * @see https://leetcode.com/problems/where-will-the-ball-fall/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(n)
 *
 * @example
 * whereWillTheBallFall([[1, 1, 1, -1, -1], [1, 1, 1, -1, -1], [-1, -1, -1, 1, 1], [1, 1, 1, 1, -1], [-1, -1, -1, -1, -1]]); // [1, -1, -1, -1, -1]
 */
export const whereWillTheBallFall = (
	grid: readonly (readonly number[])[],
): number[] =>
	Array.from({ length: grid[0]?.length ?? 0 }, (_, start) => {
		let column = start;
		for (const row of grid) {
			const slope = row[column] ?? 0;
			if (row[column + slope] !== slope) return -1;
			column += slope;
		}
		return column;
	});
