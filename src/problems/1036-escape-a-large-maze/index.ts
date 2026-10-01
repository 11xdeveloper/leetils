/**
 * 1036. Escape a Large Maze
 *
 * On a 10^6 × 10^6 grid with at most 200 blocked squares, returns whether
 * `target` can be reached from `source` moving up, down, left or right.
 *
 * The blocked squares can enclose at most about `b²/2` cells (walling off a
 * corner). So a breadth-first search from each end that reaches more cells
 * than that, or reaches the other end, can't be trapped; the path exists
 * if neither search is trapped.
 *
 * @see https://leetcode.com/problems/escape-a-large-maze/
 * @difficulty Hard
 * @timeComplexity O(b^2) for b blocked squares
 * @spaceComplexity O(b^2)
 *
 * @example
 * escapeALargeMaze([[0, 1], [1, 0]], [0, 0], [0, 2]); // false
 */
export const escapeALargeMaze = (
	blocked: readonly (readonly number[])[],
	source: readonly number[],
	target: readonly number[],
): boolean => {
	const SIZE = 1_000_000;
	const walls = new Set(blocked.map(([x = 0, y = 0]) => x * SIZE + y));
	const limit = (blocked.length * (blocked.length - 1)) / 2;

	const escapes = (from: readonly number[], to: readonly number[]): boolean => {
		const [fx = 0, fy = 0] = from;
		const goal = (to[0] ?? 0) * SIZE + (to[1] ?? 0);
		const seen = new Set([fx * SIZE + fy]);
		const queue = [[fx, fy]];
		for (const [x = 0, y = 0] of queue) {
			if (queue.length > limit) return true;
			for (const [dx, dy] of [
				[-1, 0],
				[1, 0],
				[0, -1],
				[0, 1],
			] as const) {
				const [nx, ny] = [x + dx, y + dy];
				const key = nx * SIZE + ny;
				if (
					nx < 0 ||
					ny < 0 ||
					nx >= SIZE ||
					ny >= SIZE ||
					walls.has(key) ||
					seen.has(key)
				)
					continue;
				if (key === goal) return true;
				seen.add(key);
				queue.push([nx, ny]);
			}
		}
		return false;
	};

	return escapes(source, target) && escapes(target, source);
};
