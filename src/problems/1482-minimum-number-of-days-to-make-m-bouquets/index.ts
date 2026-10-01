/**
 * 1482. Minimum Number of Days to Make m Bouquets
 *
 * Flower `i` blooms on day `bloomDay[i]`. A bouquet takes `k` adjacent
 * bloomed flowers. Returns the first day `m` bouquets can be made, or -1.
 *
 * More days never hurt, so binary search over the bloom days, counting the
 * bouquets possible on a day greedily left to right.
 *
 * @see https://leetcode.com/problems/minimum-number-of-days-to-make-m-bouquets/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumNumberOfDaysToMakeMBouquets([7, 7, 7, 7, 12, 7, 7], 2, 3); // 12
 */
export const minimumNumberOfDaysToMakeMBouquets = (
	bloomDay: readonly number[],
	m: number,
	k: number,
): number => {
	if (m * k > bloomDay.length) return -1;
	const bouquets = (day: number) => {
		let [made, run] = [0, 0];
		for (const bloom of bloomDay) {
			run = bloom <= day ? run + 1 : 0;
			if (run === k) {
				made++;
				run = 0;
			}
		}
		return made;
	};
	const days = [...new Set(bloomDay)].sort((a, b) => a - b);
	let [low, high] = [0, days.length - 1];
	while (low < high) {
		const mid = (low + high) >>> 1;
		if (bouquets(days[mid] ?? 0) >= m) high = mid;
		else low = mid + 1;
	}
	return days[low] ?? -1;
};
