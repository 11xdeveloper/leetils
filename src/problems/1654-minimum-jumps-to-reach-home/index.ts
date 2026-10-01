/**
 * 1654. Minimum Jumps to Reach Home
 *
 * A bug jumps `a` forward or `b` backward, never backward twice in a row,
 * below 0, or onto a `forbidden` position. Returns the fewest jumps from 0
 * to `x`, or -1.
 *
 * Breadth-first search over (position, whether the last jump was
 * backward). An optimal path never needs to go beyond
 * `max(x, largest forbidden) + a + b`, which bounds the search.
 *
 * @see https://leetcode.com/problems/minimum-jumps-to-reach-home/
 * @difficulty Medium
 * @timeComplexity O(M + a + b) for the largest of x and the forbidden positions M
 * @spaceComplexity O(M + a + b)
 *
 * @example
 * minimumJumpsToReachHome([14, 4, 18, 1, 15], 3, 15, 9); // 3
 */
export const minimumJumpsToReachHome = (
	forbidden: readonly number[],
	a: number,
	b: number,
	x: number,
): number => {
	const limit = Math.max(x, ...forbidden) + a + b;
	const blocked = new Set(forbidden);
	// seen[2 · position + back] marks states reached with or without a backward last jump.
	const seen = new Uint8Array(2 * (limit + 1));
	seen[0] = 1;
	let level: [position: number, back: number][] = [[0, 0]];
	for (let jumps = 0; level.length > 0; jumps++) {
		const next: [number, number][] = [];
		for (const [position, back] of level) {
			if (position === x) return jumps;
			const moves: [number, number][] = [[position + a, 0]];
			if (back === 0) moves.push([position - b, 1]);
			for (const [target, isBack] of moves) {
				if (
					target < 0 ||
					target > limit ||
					blocked.has(target) ||
					seen[2 * target + isBack]
				)
					continue;
				seen[2 * target + isBack] = 1;
				next.push([target, isBack]);
			}
		}
		level = next;
	}
	return -1;
};
