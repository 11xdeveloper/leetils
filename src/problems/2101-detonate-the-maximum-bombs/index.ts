/**
 * 2101. Detonate the Maximum Bombs
 *
 * A bomb `[x, y, r]` detonates every bomb within distance `r` of it,
 * setting off chain reactions. Returns the most bombs one detonation can
 * set off.
 *
 * Build the directed "sets off" graph and search from every bomb.
 *
 * @see https://leetcode.com/problems/detonate-the-maximum-bombs/
 * @difficulty Medium
 * @timeComplexity O(n^3)
 * @spaceComplexity O(n^2)
 *
 * @example
 * detonateTheMaximumBombs([[2, 1, 3], [6, 1, 4]]); // 2
 */
export const detonateTheMaximumBombs = (
	bombs: readonly (readonly number[])[],
): number => {
	const reaches = bombs.map(([x = 0, y = 0, r = 0]) =>
		bombs.flatMap(([bx = 0, by = 0], j) =>
			(bx - x) ** 2 + (by - y) ** 2 <= r * r ? [j] : [],
		),
	);
	let best = 0;
	for (let start = 0; start < bombs.length; start++) {
		const seen = new Set([start]);
		const stack = [start];
		for (let bomb = stack.pop(); bomb !== undefined; bomb = stack.pop()) {
			for (const next of reaches[bomb] ?? []) {
				if (seen.has(next)) continue;
				seen.add(next);
				stack.push(next);
			}
		}
		best = Math.max(best, seen.size);
	}
	return best;
};
