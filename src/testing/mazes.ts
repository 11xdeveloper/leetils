import type { Random } from "./random";

/**
 * A random maze of 0s (open) and 1s (walls), with two distinct open cells
 * for a start and an end, or `undefined` if fewer than two cells are open.
 */
export const randomMaze = (
	random: Random,
	maxRows: number,
	maxCols: number,
):
	| { maze: number[][]; start: [number, number]; end: [number, number] }
	| undefined => {
	const cols = random.int(1, maxCols);
	const maze = Array.from({ length: random.int(1, maxRows) }, () =>
		Array.from({ length: cols }, () => (random.int(0, 2) === 0 ? 1 : 0)),
	);

	const open: [number, number][] = [];
	for (const [r, row] of maze.entries()) {
		for (const [c, cell] of row.entries()) if (cell === 0) open.push([r, c]);
	}
	const start = open.splice(random.int(0, open.length - 1), 1)[0];
	const end = open[random.int(0, open.length - 1)];
	return start && end ? { maze, start, end } : undefined;
};

/**
 * Where a ball rolling from (row, col) in direction (dr, dc) stops, and how
 * far it travels. It stops at a wall or the edge of the maze, or drops into
 * `hole` if it passes over it.
 */
export const roll = (
	maze: readonly (readonly number[])[],
	row: number,
	col: number,
	dr: number,
	dc: number,
	hole?: readonly number[],
): [row: number, col: number, distance: number] => {
	let distance = 0;
	while (maze[row + dr]?.[col + dc] === 0) {
		row += dr;
		col += dc;
		distance++;
		if (hole && row === hole[0] && col === hole[1]) break;
	}
	return [row, col, distance];
};
