/**
 * 1956. Minimum Time For K Virus Variants to Spread
 *
 * Each variant spreads one cell per day in the four directions from its
 * origin. Returns the fewest days until some cell holds at least `k`
 * variants.
 *
 * A cell holds a variant after its Manhattan distance in days, so the
 * answer at a cell is its `k`-th smallest distance. Some best cell lies
 * within the origins' bounding box (coordinates are at most 100); check
 * every cell there.
 *
 * @see https://leetcode.com/problems/minimum-time-for-k-virus-variants-to-spread/
 * @difficulty Hard
 * @timeComplexity O(W · H · n log n) over the bounding box
 * @spaceComplexity O(n)
 *
 * @example
 * minimumTimeForKVirusVariantsToSpread([[3, 3], [1, 2], [9, 2]], 3); // 4
 */
export const minimumTimeForKVirusVariantsToSpread = (
	points: readonly (readonly number[])[],
	k: number,
): number => {
	const xs = points.map(([x = 0]) => x);
	const ys = points.map(([, y = 0]) => y);
	let best = Infinity;
	for (let x = Math.min(...xs); x <= Math.max(...xs); x++) {
		for (let y = Math.min(...ys); y <= Math.max(...ys); y++) {
			const distances = points
				.map(([px = 0, py = 0]) => Math.abs(px - x) + Math.abs(py - y))
				.sort((a, b) => a - b);
			best = Math.min(best, distances[k - 1] ?? Infinity);
		}
	}
	return best;
};
