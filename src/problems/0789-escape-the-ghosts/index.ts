/**
 * 789. Escape The Ghosts
 *
 * You start at the origin and head for `target` on an infinite grid, while
 * ghosts move too, one step per turn each. Returns whether you can reach
 * the target before any ghost can reach you (arriving at the same time
 * counts as caught).
 *
 * A ghost that can reach the target no later than you can just wait there,
 * and if every ghost is strictly further from the target, none can
 * intercept you on a shortest path. So it compares Manhattan distances.
 *
 * @see https://leetcode.com/problems/escape-the-ghosts/
 * @difficulty Medium
 * @timeComplexity O(g) for g ghosts
 * @spaceComplexity O(1)
 *
 * @example
 * escapeTheGhosts([[1, 0], [0, 3]], [0, 1]); // true
 */
export const escapeTheGhosts = (
	ghosts: readonly (readonly number[])[],
	target: readonly number[],
): boolean => {
	const [tx = 0, ty = 0] = target;
	const mine = Math.abs(tx) + Math.abs(ty);
	return ghosts.every(
		([gx = 0, gy = 0]) => Math.abs(gx - tx) + Math.abs(gy - ty) > mine,
	);
};
