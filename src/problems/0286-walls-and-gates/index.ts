const EMPTY = 2 ** 31 - 1;

/**
 * 286. Walls and Gates
 *
 * In a grid of walls (-1), gates (0) and empty rooms (2^31 - 1), fills each
 * empty room with the number of steps to its nearest gate, in place, as the
 * problem requires. Rooms that can't reach a gate stay 2^31 - 1.
 *
 * Breadth-first search from every gate at once: each room is first reached
 * from its nearest gate, so its distance is set once and never revisited.
 *
 * @see https://leetcode.com/problems/walls-and-gates/
 * @difficulty Medium
 * @timeComplexity O(m * n)
 * @spaceComplexity O(m * n)
 *
 * @example
 * wallsAndGates(rooms); // each empty room now holds its distance to the nearest gate
 */
export const wallsAndGates = (rooms: number[][]): void => {
	const queue: [number, number][] = [];
	for (const [r, row] of rooms.entries()) {
		for (const [c, cell] of row.entries()) if (cell === 0) queue.push([r, c]);
	}

	for (let head = 0; head < queue.length; head++) {
		const [r, c] = queue[head] ?? [0, 0];
		const distance = (rooms[r]?.[c] ?? 0) + 1;
		for (const [nr, nc] of [
			[r + 1, c],
			[r - 1, c],
			[r, c + 1],
			[r, c - 1],
		] as const) {
			const row = rooms[nr];
			if (row?.[nc] !== EMPTY) continue;
			row[nc] = distance;
			queue.push([nr, nc]);
		}
	}
};
