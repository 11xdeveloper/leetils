/**
 * 1926. Nearest Exit from Entrance in Maze
 *
 * In `maze` (`.` open, `+` wall), returns the fewest steps from `entrance`
 * to an open border cell other than the entrance itself, or -1.
 *
 * Breadth-first search from the entrance.
 *
 * @see https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
 * @difficulty Medium
 * @timeComplexity O(mn)
 * @spaceComplexity O(mn)
 *
 * @example
 * nearestExitFromEntranceInMaze([["+", "+", "+"], [".", ".", "."], ["+", "+", "+"]], [1, 0]); // 2
 */
export const nearestExitFromEntranceInMaze = (
	maze: readonly (readonly string[])[],
	entrance: readonly number[],
): number => {
	const [rows, cols] = [maze.length, maze[0]?.length ?? 0];
	const [startRow = 0, startCol = 0] = entrance;
	const seen = new Uint8Array(rows * cols);
	seen[startRow * cols + startCol] = 1;
	let level: [number, number][] = [[startRow, startCol]];
	for (let steps = 1; level.length > 0; steps++) {
		const next: [number, number][] = [];
		for (const [row, col] of level) {
			for (const [r, c] of [
				[row - 1, col],
				[row + 1, col],
				[row, col - 1],
				[row, col + 1],
			] as const) {
				if (
					r < 0 ||
					r >= rows ||
					c < 0 ||
					c >= cols ||
					seen[r * cols + c] ||
					maze[r]?.[c] !== "."
				)
					continue;
				if (r === 0 || r === rows - 1 || c === 0 || c === cols - 1)
					return steps;
				seen[r * cols + c] = 1;
				next.push([r, c]);
			}
		}
		level = next;
	}
	return -1;
};
