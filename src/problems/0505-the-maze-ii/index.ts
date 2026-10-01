import { Heap } from "../../internal/heap";

/**
 * 505. The Maze II
 *
 * A ball in a maze of empty cells (`0`) and walls (`1`) rolls up, down,
 * left or right, and only stops when the next cell is a wall or outside the
 * maze. Returns the shortest distance (in cells rolled) for it to stop at
 * `destination`, starting from `start`, or -1 if it can't.
 *
 * Dijkstra's algorithm over the cells where the ball can stop, since rolls
 * have different lengths.
 *
 * @see https://leetcode.com/problems/the-maze-ii/
 * @difficulty Medium
 * @timeComplexity O(m · n · (m + n + log(m · n)))
 * @spaceComplexity O(m · n)
 *
 * @example
 * theMazeII([[0, 0, 1, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 1], [0, 0, 0, 0, 0]], [0, 4], [4, 4]); // 12
 */
export const theMazeII = (
	maze: readonly (readonly number[])[],
	start: readonly number[],
	destination: readonly number[],
): number => {
	const [startRow = 0, startCol = 0] = start;
	const [endRow = 0, endCol = 0] = destination;
	const cols = maze[0]?.length ?? 0;
	const shortest = new Map([[startRow * cols + startCol, 0]]);
	const queue = new Heap<[distance: number, row: number, col: number]>(
		(a, b) => a[0] - b[0],
		[[0, startRow, startCol]],
	);

	for (let entry = queue.pop(); entry; entry = queue.pop()) {
		const [distance, row, col] = entry;
		if (distance > (shortest.get(row * cols + col) ?? Number.POSITIVE_INFINITY))
			continue;
		if (row === endRow && col === endCol) return distance;

		for (const [dr, dc] of [
			[-1, 0],
			[1, 0],
			[0, -1],
			[0, 1],
		] as const) {
			let r = row;
			let c = col;
			let rolled = distance;
			while (maze[r + dr]?.[c + dc] === 0) {
				r += dr;
				c += dc;
				rolled++;
			}
			if (rolled < (shortest.get(r * cols + c) ?? Number.POSITIVE_INFINITY)) {
				shortest.set(r * cols + c, rolled);
				queue.push([rolled, r, c]);
			}
		}
	}

	return -1;
};
