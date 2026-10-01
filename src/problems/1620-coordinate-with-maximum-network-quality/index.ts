/**
 * 1620. Coordinate With Maximum Network Quality
 *
 * Each tower `[x, y, q]` within `radius` of a point contributes
 * `⌊q / (1 + d)⌋` for distance `d`. Returns the integer point with the
 * highest total, the smallest such point on ties.
 *
 * Coordinates are at most 50, so the best point lies in `0 … 50` on each
 * axis; try them all in order.
 *
 * @see https://leetcode.com/problems/coordinate-with-maximum-network-quality/
 * @difficulty Medium
 * @timeComplexity O(51^2 · t) for t towers
 * @spaceComplexity O(1)
 *
 * @example
 * coordinateWithMaximumNetworkQuality([[1, 2, 5], [2, 1, 7], [3, 1, 9]], 2); // [2, 1]
 */
export const coordinateWithMaximumNetworkQuality = (
	towers: readonly (readonly number[])[],
	radius: number,
): number[] => {
	let [best, quality] = [[0, 0], 0];
	for (let x = 0; x <= 50; x++) {
		for (let y = 0; y <= 50; y++) {
			let total = 0;
			for (const [tx = 0, ty = 0, q = 0] of towers) {
				const d = Math.hypot(tx - x, ty - y);
				if (d <= radius) total += Math.floor(q / (1 + d));
			}
			if (total > quality) [best, quality] = [[x, y], total];
		}
	}
	return best;
};
