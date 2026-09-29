/**
 * 490. The Maze
 *
 * A ball in a maze of empty cells (`0`) and walls (`1`) rolls up, down,
 * left or right, and only stops when the next cell is a wall or outside the
 * maze. Returns whether it can stop at `destination`, starting from `start`.
 *
 * Breadth-first search over the cells where the ball can stop, rolling in
 * all four directions from each.
 *
 * @see https://leetcode.com/problems/the-maze/
 * @difficulty Medium
 * @timeComplexity O(m · n · (m + n)), each stop rolls up to m + n cells
 * @spaceComplexity O(m · n)
 *
 * @example
 * theMaze([[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]], [0, 4], [4, 4]); // true
 */
export const theMaze = (
	maze: readonly (readonly number[])[],
	start: readonly number[],
	destination: readonly number[],
): boolean => {
	const [startRow = 0, startCol = 0] = start;
	const [endRow = 0, endCol = 0] = destination;
	const cols = maze[0]?.length ?? 0;
	const seen = new Set([startRow * cols + startCol]);
	const queue = [[startRow, startCol]];

	for (const [row = 0, col = 0] of queue) {
		if (row === endRow && col === endCol) return true;
		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			let r = row;
			let c = col;
			while (maze[r + dr]?.[c + dc] === 0) {
				r += dr;
				c += dc;
			}
			if (!seen.has(r * cols + c)) {
				seen.add(r * cols + c);
				queue.push([r, c]);
			}
		}
	}

	return false;
};
