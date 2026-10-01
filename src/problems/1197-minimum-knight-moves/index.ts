/**
 * 1197. Minimum Knight Moves
 *
 * Returns the fewest moves for a knight on an infinite board to get from
 * `(0, 0)` to `(x, y)`.
 *
 * The board is symmetric, so the target can be moved into the first
 * quadrant. A shortest path there never needs to stray more than two
 * squares outside the box between the origin and the target, so a
 * breadth-first search over that bounded area finds it.
 *
 * @see https://leetcode.com/problems/minimum-knight-moves/
 * @difficulty Medium
 * @timeComplexity O(|x| · |y|)
 * @spaceComplexity O(|x| · |y|)
 *
 * @example
 * minimumKnightMoves(5, 5); // 4
 */
export const minimumKnightMoves = (x: number, y: number): number => {
	const [targetX, targetY] = [Math.abs(x), Math.abs(y)];
	const [low, width, height] = [-2, targetX + 5, targetY + 5];
	const index = (a: number, b: number) => (a - low) * height + (b - low);
	const seen = new Uint8Array(width * height);
	seen[index(0, 0)] = 1;
	let frontier = [[0, 0]];
	for (let moves = 0; frontier.length > 0; moves++) {
		const next: number[][] = [];
		for (const [a = 0, b = 0] of frontier) {
			if (a === targetX && b === targetY) return moves;
			for (const [da, db] of [
				[1, 2],
				[2, 1],
				[2, -1],
				[1, -2],
				[-1, -2],
				[-2, -1],
				[-2, 1],
				[-1, 2],
			] as const) {
				const [a2, b2] = [a + da, b + db];
				if (a2 < low || a2 >= low + width || b2 < low || b2 >= low + height)
					continue;
				if (seen[index(a2, b2)]) continue;
				seen[index(a2, b2)] = 1;
				next.push([a2, b2]);
			}
		}
		frontier = next;
	}
	return -1;
};
