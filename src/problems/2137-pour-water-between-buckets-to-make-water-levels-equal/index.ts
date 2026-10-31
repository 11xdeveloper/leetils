/**
 * 2137. Pour Water Between Buckets to Make Water Levels Equal
 *
 * Pouring water between buckets spills `loss` percent of it. Returns the
 * highest level all buckets can be brought to (within 10^-5).
 *
 * A level is reachable when the water above it, less the spill, covers
 * the shortfall below it; binary search for the highest.
 *
 * @see https://leetcode.com/problems/pour-water-between-buckets-to-make-water-levels-equal/
 * @difficulty Medium
 * @timeComplexity O(n log(max / ε))
 * @spaceComplexity O(1)
 *
 * @example
 * pourWaterBetweenBucketsToMakeWaterLevelsEqual([1, 2, 7], 80); // 2
 */
export const pourWaterBetweenBucketsToMakeWaterLevelsEqual = (
	buckets: readonly number[],
	loss: number,
): number => {
	const kept = (100 - loss) / 100;
	let [lo, hi] = [0, Math.max(...buckets)];
	while (hi - lo > 1e-7) {
		const level = (lo + hi) / 2;
		let [surplus, shortfall] = [0, 0];
		for (const water of buckets) {
			if (water > level) surplus += water - level;
			else shortfall += level - water;
		}
		if (surplus * kept >= shortfall) lo = level;
		else hi = level;
	}
	return lo;
};
