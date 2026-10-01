import { Heap } from "../../internal/heap";

/** The interface LeetCode provides for controlling the robot. */
interface GridMaster {
	canMove(direction: string): boolean;
	move(direction: string): number;
	isTarget(): boolean;
}

const DIRECTIONS = [
	["U", -1, 0, "D"],
	["D", 1, 0, "U"],
	["L", 0, -1, "R"],
	["R", 0, 1, "L"],
] as const;

/**
 * 1810. Minimum Path Cost in a Hidden Grid
 *
 * Every move into a cell costs that cell's cost. Using only `master`'s
 * moves and checks, returns the cheapest total cost from the robot's start
 * to the hidden target, or -1.
 *
 * Map the reachable grid with a depth-first search that walks the robot
 * (an explicit stack, backing up the way it came), recording each new
 * cell's cost and where the target is. Then run Dijkstra on the map.
 *
 * @see https://leetcode.com/problems/minimum-path-cost-in-a-hidden-grid/
 * @difficulty Medium
 * @timeComplexity O(c log c) for c reachable cells
 * @spaceComplexity O(c)
 *
 * @example
 * minimumPathCostInAHiddenGrid(master); // 2 for the grid [[2, 3], [1, 1]] from (0, 1) to (1, 0)
 */
export const minimumPathCostInAHiddenGrid = (master: GridMaster): number => {
	const key = (r: number, c: number) => `${r},${c}`;
	// The start's cost only matters if a path re-enters it, which is never cheaper.
	const cost = new Map([[key(0, 0), 0]]);
	let target: string | undefined = master.isTarget() ? key(0, 0) : undefined;
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
		if (cost.has(cell) || !master.canMove(direction)) continue;
		cost.set(cell, master.move(direction));
		if (master.isTarget()) target = cell;
		stack.push([row + dr, col + dc, 0, opposite]);
	}
	if (target === undefined) return -1;
	const best = new Map([[key(0, 0), 0]]);
	const heap = new Heap<[total: number, row: number, col: number]>(
		(a, b) => a[0] - b[0],
		[[0, 0, 0]],
	);
	for (let entry = heap.pop(); entry; entry = heap.pop()) {
		const [total, row, col] = entry;
		if (key(row, col) === target) return total;
		if (total > (best.get(key(row, col)) ?? Infinity)) continue;
		for (const [, dr, dc] of DIRECTIONS) {
			const cell = key(row + dr, col + dc);
			const step = cost.get(cell);
			if (step === undefined || total + step >= (best.get(cell) ?? Infinity))
				continue;
			best.set(cell, total + step);
			heap.push([total + step, row + dr, col + dc]);
		}
	}
	return -1;
};
