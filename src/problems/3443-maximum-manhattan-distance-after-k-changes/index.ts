/**
 * 3443. Maximum Manhattan Distance After K Changes
 *
 * Walk the moves in `s` (N, S, E, W) from the origin, after changing up to
 * `k` of them. Returns the largest Manhattan distance reached at any point.
 *
 * For each prefix and each target quadrant, moves towards it count +1 and
 * the others -1; changing a wrong move gains 2, so the distance is
 * good - bad + 2 · min(k, bad).
 *
 * @see https://leetcode.com/problems/maximum-manhattan-distance-after-k-changes/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumManhattanDistanceAfterKChanges("NWSE", 1); // 3
 */
export const maximumManhattanDistanceAfterKChanges = (
	s: string,
	k: number,
): number => {
	const counts: Record<string, number> = { N: 0, S: 0, E: 0, W: 0 };
	let best = 0;
	for (const move of s) {
		counts[move] = (counts[move] ?? 0) + 1;
		for (const [vertical, horizontal] of [
			["N", "E"],
			["N", "W"],
			["S", "E"],
			["S", "W"],
		] as const) {
			const good = (counts[vertical] ?? 0) + (counts[horizontal] ?? 0);
			const bad = Object.values(counts).reduce((a, b) => a + b, 0) - good;
			best = Math.max(best, good - bad + 2 * Math.min(k, bad));
		}
	}
	return best;
};
