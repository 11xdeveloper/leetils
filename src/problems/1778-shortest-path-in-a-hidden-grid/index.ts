/** The interface LeetCode provides for controlling the robot. */
interface GridMaster {
	canMove(direction: string): boolean;
	move(direction: string): void;
	isTarget(): boolean;
}

const DIRECTIONS = [
	["U", -1, 0, "D"],
	["D", 1, 0, "U"],
	["L", 0, -1, "R"],
	["R", 0, 1, "L"],
] as const;

/**
 * 1778. Shortest Path in a Hidden Grid
 *
 * Using only `master`'s moves and checks, returns the fewest steps from
 * the robot's start to the hidden target, or -1.
 *
 * First map the reachable grid with a depth-first search that physically
 * walks the robot (backing up along the way it came, with an explicit
 * stack), recording open cells relative to the start and where the target
 * is. Then breadth-first search the map.
 *
 * @see https://leetcode.com/problems/shortest-path-in-a-hidden-grid/
 * @difficulty Medium
 * @timeComplexity O(c) robot operations for c reachable cells
 * @spaceComplexity O(c)
 *
 * @example
 * shortestPathInAHiddenGrid(master); // 2 for the grid [[1, 2], [-1, 0]]
 */
export const shortestPathInAHiddenGrid = (master: GridMaster): number => {
	const key = (r: number, c: number) => `${r},${c}`;
	const open = new Set([key(0, 0)]);
	let target: string | undefined = master.isTarget() ? key(0, 0) : undefined;
	// Each frame: cell, next direction to try, and the move that undoes how we got here.
	const stack: [
		row: number,
		col: number,
		next: number,
		back: string | undefined,
	][] = [[0, 0, 0, undefined]];
	while (stack.length > 0) {
		const frame = stack.at(-1);
		if (!frame) break;
		const [row, col, next, back] = frame;
		if (next === DIRECTIONS.length) {
			stack.pop();
			if (back) master.move(back);
			continue;
		}
		frame[2] = next + 1;
		const [direction, dr, dc, opposite] = DIRECTIONS[next] ?? DIRECTIONS[0];
		const cell = key(row + dr, col + dc);
		if (open.has(cell) || !master.canMove(direction)) continue;
		master.move(direction);
		open.add(cell);
		if (master.isTarget()) target = cell;
		stack.push([row + dr, col + dc, 0, opposite]);
	}
	if (target === undefined) return -1;
	const dist = new Map([[key(0, 0), 0]]);
	const queue: [number, number][] = [[0, 0]];
	for (let head = 0; head < queue.length; head++) {
		const [row, col] = queue[head] ?? [0, 0];
		const steps = dist.get(key(row, col)) ?? 0;
		if (key(row, col) === target) return steps;
		for (const [, dr, dc] of DIRECTIONS) {
			const cell = key(row + dr, col + dc);
			if (!open.has(cell) || dist.has(cell)) continue;
			dist.set(cell, steps + 1);
			queue.push([row + dr, col + dc]);
		}
	}
	return -1;
};
