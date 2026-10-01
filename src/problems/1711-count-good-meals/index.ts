/**
 * 1711. Count Good Meals
 *
 * Counts the pairs of distinct items whose deliciousness sums to a power
 * of two, modulo 10^9 + 7.
 *
 * For each item, look up how many earlier items complete each of the 22
 * possible powers of two (sums are at most 2^21).
 *
 * @see https://leetcode.com/problems/count-good-meals/
 * @difficulty Medium
 * @timeComplexity O(22n)
 * @spaceComplexity O(n)
 *
 * @example
 * countGoodMeals([1, 3, 5, 7, 9]); // 4
 */
export const countGoodMeals = (deliciousness: readonly number[]): number => {
	const seen = new Map<number, number>();
	let pairs = 0;
	for (const value of deliciousness) {
		for (let power = 1; power <= 2 ** 21; power *= 2)
			pairs += seen.get(power - value) ?? 0;
		seen.set(value, (seen.get(value) ?? 0) + 1);
	}
	return pairs % 1_000_000_007;
};
