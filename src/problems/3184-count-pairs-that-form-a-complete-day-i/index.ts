/**
 * 3184. Count Pairs That Form a Complete Day I
 *
 * Count the pairs i < j whose hours add up to a multiple of 24.
 *
 * Count hours by remainder mod 24; each new hour pairs with the earlier
 * ones of the complementary remainder.
 *
 * @see https://leetcode.com/problems/count-pairs-that-form-a-complete-day-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countPairsThatFormACompleteDayI([12, 12, 30, 24, 24]); // 2
 */
export const countPairsThatFormACompleteDayI = (
	hours: readonly number[],
): number => {
	const counts = new Array<number>(24).fill(0);
	let pairs = 0;
	for (const hour of hours) {
		const remainder = hour % 24;
		pairs += counts[(24 - remainder) % 24] ?? 0;
		counts[remainder] = (counts[remainder] ?? 0) + 1;
	}
	return pairs;
};
