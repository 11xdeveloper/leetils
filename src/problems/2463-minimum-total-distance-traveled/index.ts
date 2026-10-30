/**
 * 2463. Minimum Total Distance Traveled
 *
 * Robots on a line each travel to a factory `[position, limit]`, which
 * repairs at most `limit` robots. Returns the least total distance.
 *
 * In an optimal assignment, sorted robots go to sorted factories in
 * order, each factory taking a contiguous run. `best[j][i]` covers the
 * first `i` robots with the first `j` factories.
 *
 * @see https://leetcode.com/problems/minimum-total-distance-traveled/
 * @difficulty Hard
 * @timeComplexity O(m · n · L) for factory limits up to L
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTotalDistanceTraveled([0, 4, 6], [[2, 2], [6, 2]]); // 4
 */
export const minimumTotalDistanceTraveled = (
	robot: readonly number[],
	factory: readonly (readonly number[])[],
): number => {
	const robots = robot.toSorted((a, b) => a - b);
	const factories = factory.toSorted((a, b) => (a[0] ?? 0) - (b[0] ?? 0));
	const n = robots.length;
	let best = new Array<number>(n + 1).fill(Infinity);
	best[0] = 0;
	for (const [position = 0, limit = 0] of factories) {
		const next = [...best];
		for (let i = 1; i <= n; i++) {
			let distance = 0;
			for (let taken = 1; taken <= Math.min(limit, i); taken++) {
				distance += Math.abs((robots[i - taken] ?? 0) - position);
				next[i] = Math.min(
					next[i] ?? Infinity,
					(best[i - taken] ?? Infinity) + distance,
				);
			}
		}
		best = next;
	}
	return best[n] ?? 0;
};
