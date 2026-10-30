/**
 * 2136. Earliest Possible Day of Full Bloom
 *
 * Seed `i` takes `plantTime[i]` days of planting (one seed's work per
 * day, in any order) and then `growTime[i]` days to bloom. Returns the
 * earliest day all seeds are blooming.
 *
 * Planting is sequential, so plant the slowest growers first (an exchange
 * argument shows this is optimal).
 *
 * @see https://leetcode.com/problems/earliest-possible-day-of-full-bloom/
 * @difficulty Hard
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * earliestPossibleDayOfFullBloom([1, 4, 3], [2, 3, 1]); // 9
 */
export const earliestPossibleDayOfFullBloom = (
	plantTime: readonly number[],
	growTime: readonly number[],
): number => {
	const order = plantTime
		.map((_, i) => i)
		.sort((a, b) => (growTime[b] ?? 0) - (growTime[a] ?? 0));
	let [planted, bloom] = [0, 0];
	for (const seed of order) {
		planted += plantTime[seed] ?? 0;
		bloom = Math.max(bloom, planted + (growTime[seed] ?? 0));
	}
	return bloom;
};
