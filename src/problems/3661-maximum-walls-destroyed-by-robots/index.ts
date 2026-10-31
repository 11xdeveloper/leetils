/**
 * 3661. Maximum Walls Destroyed by Robots
 *
 * Each robot fires once, left or right, destroying the walls within
 * `distance[i]` of it, but its bullet stops at the next robot. Returns the
 * most walls destroyed.
 *
 * Sort the robots; each one's left and right reaches are capped by its
 * neighbours. Dynamic programming over robots and the direction each
 * fired: the only overlap is between a robot firing right and the next
 * firing left, so count the second's walls past the first's reach.
 *
 * @see https://leetcode.com/problems/maximum-walls-destroyed-by-robots/
 * @difficulty Hard
 * @timeComplexity O((n + w) log(n + w))
 * @spaceComplexity O(n + w)
 *
 * @example
 * maximumWallsDestroyedByRobots([10, 2], [5, 1], [5, 2, 7]); // 3
 */
export const maximumWallsDestroyedByRobots = (
	robots: readonly number[],
	distance: readonly number[],
	walls: readonly number[],
): number => {
	const order = robots
		.map((_, i) => i)
		.sort((a, b) => (robots[a] ?? 0) - (robots[b] ?? 0));
	const sortedWalls = [...walls].sort((a, b) => a - b);
	/** Walls at positions below x. */
	const below = (x: number): number => {
		let [lo, hi] = [0, sortedWalls.length];
		while (lo < hi) {
			const mid = (lo + hi) >>> 1;
			if ((sortedWalls[mid] ?? 0) < x) lo = mid + 1;
			else hi = mid;
		}
		return lo;
	};
	const count = (from: number, to: number): number =>
		from > to ? 0 : below(to + 1) - below(from);
	let [left, right] = [0, 0];
	let previousReach = Number.NEGATIVE_INFINITY;
	order.forEach((index, k) => {
		const position = robots[index] ?? 0;
		const reach = distance[index] ?? 0;
		const before =
			k > 0 ? (robots[order[k - 1] ?? 0] ?? 0) : Number.NEGATIVE_INFINITY;
		const after =
			k + 1 < order.length
				? (robots[order[k + 1] ?? 0] ?? 0)
				: Number.POSITIVE_INFINITY;
		const leftFrom = Math.max(position - reach, before + 1);
		const rightTo = Math.min(position + reach, after - 1);
		const nextLeft = Math.max(
			left + count(leftFrom, position),
			right + count(Math.max(leftFrom, previousReach + 1), position),
		);
		const nextRight = Math.max(left, right) + count(position, rightTo);
		[left, right] = [nextLeft, nextRight];
		previousReach = rightTo;
	});
	return Math.max(left, right);
};
