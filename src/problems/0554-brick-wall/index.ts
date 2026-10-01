/**
 * 554. Brick Wall
 *
 * Each row of a wall lists its bricks' widths, and all rows have the same
 * total width. Returns the fewest bricks a vertical line (not along either
 * outer edge) must cross.
 *
 * A line crosses every row except those with a brick edge at its position,
 * so it counts how many rows have an edge at each position, excluding the
 * wall's right edge, and draws the line at the most common one.
 *
 * @see https://leetcode.com/problems/brick-wall/
 * @difficulty Medium
 * @timeComplexity O(total number of bricks)
 * @spaceComplexity O(number of distinct edge positions)
 *
 * @example
 * brickWall([[1, 2, 2, 1], [3, 1, 2], [1, 3, 2], [2, 4], [3, 1, 2], [1, 3, 1, 1]]); // 2
 */
export const brickWall = (wall: readonly (readonly number[])[]): number => {
	const edges = new Map<number, number>();
	let mostEdges = 0;

	for (const row of wall) {
		let position = 0;
		for (let i = 0; i < row.length - 1; i++) {
			position += row[i] ?? 0;
			const count = (edges.get(position) ?? 0) + 1;
			edges.set(position, count);
			mostEdges = Math.max(mostEdges, count);
		}
	}

	return wall.length - mostEdges;
};
