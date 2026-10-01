import { Heap } from "../../internal/heap";

/**
 * 499. The Maze III
 *
 * A ball in a maze of empty cells (`0`) and walls (`1`) rolls up, down,
 * left or right until it hits a wall or the edge, or drops into the `hole`
 * if it passes over it. Returns the directions (`"u"`, `"d"`, `"l"`, `"r"`)
 * that get the ball from `ball` into the hole over the shortest distance,
 * the lexicographically smallest if there's a tie, or `"impossible"`.
 *
 * Dijkstra's algorithm over the cells where the ball can stop, ordering
 * routes by distance and then by their directions as a string. Extending
 * two routes to the same cell by the same roll keeps them in the same
 * order, so the best route to each cell only needs extending once.
 *
 * @see https://leetcode.com/problems/the-maze-iii/
 * @difficulty Hard
 * @timeComplexity O(m · n · (m + n + log(m · n)) + route comparisons)
 * @spaceComplexity O(m · n)
 *
 * @example
 * theMazeIII([[0, 0, 0, 0, 0], [1, 1, 0, 0, 1], [0, 0, 0, 0, 0], [0, 1, 0, 0, 1], [0, 1, 0, 0, 0]], [4, 3], [0, 1]); // "lul"
 */
export const theMazeIII = (
	maze: readonly (readonly number[])[],
	ball: readonly number[],
	hole: readonly number[],
): string => {
	const [holeRow = 0, holeCol = 0] = hole;
	const cols = maze[0]?.length ?? 0;
	const moves = [
		["d", 1, 0],
		["l", 0, -1],
		["r", 0, 1],
		["u", -1, 0],
	] as const;

	type Route = { distance: number; path: string; row: number; col: number };
	const better = (a: Route, b: Route): number =>
		a.distance - b.distance || (a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
	const best = new Map<number, Route>();
	const start: Route = {
		distance: 0,
		path: "",
		row: ball[0] ?? 0,
		col: ball[1] ?? 0,
	};
	best.set(start.row * cols + start.col, start);
	const queue = new Heap<Route>(better, [start]);

	for (let route = queue.pop(); route; route = queue.pop()) {
		if (best.get(route.row * cols + route.col) !== route) continue;
		if (route.row === holeRow && route.col === holeCol) return route.path;

		for (const [direction, dr, dc] of moves) {
			let { row, col } = route;
			let distance = route.distance;
			while (
				maze[row + dr]?.[col + dc] === 0 &&
				!(row === holeRow && col === holeCol)
			) {
				row += dr;
				col += dc;
				distance++;
			}
			if (distance === route.distance) continue;

			const next: Route = { distance, path: route.path + direction, row, col };
			const known = best.get(row * cols + col);
			if (!known || better(next, known) < 0) {
				best.set(row * cols + col, next);
				queue.push(next);
			}
		}
	}

	return "impossible";
};
