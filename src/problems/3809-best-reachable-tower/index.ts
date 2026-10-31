/**
 * 3809. Best Reachable Tower
 *
 * Among towers `[x, y, q]` within Manhattan distance `radius` of `center`,
 * returns the coordinates of the best quality one (ties go to the
 * smallest coordinates), or [-1, -1].
 *
 * @see https://leetcode.com/problems/best-reachable-tower/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * bestReachableTower([[1, 2, 5], [2, 1, 7], [3, 1, 9]], [1, 1], 2); // [3, 1]
 */
export const bestReachableTower = (
	towers: readonly (readonly number[])[],
	center: readonly number[],
	radius: number,
): number[] => {
	const [cx = 0, cy = 0] = center;
	let best: number[] = [-1, -1];
	let quality = -1;
	for (const [x = 0, y = 0, q = 0] of towers) {
		if (Math.abs(x - cx) + Math.abs(y - cy) > radius) continue;
		const [bx = 0, by = 0] = best;
		if (q > quality || (q === quality && (x < bx || (x === bx && y < by)))) {
			best = [x, y];
			quality = q;
		}
	}
	return best;
};
