/**
 * 808. Soup Servings
 *
 * Two soups start with `n` ml each. Each turn, one of four servings is
 * chosen with equal probability: (100, 0), (75, 25), (50, 50) or (25, 75) ml
 * from A and B, taking what's left if less. Returns the probability that A
 * runs out first, plus half the probability they run out together.
 *
 * Measured in units of 25 ml, a memoised recursion over the amounts left.
 * Since servings take more of A on average, the answer tends to 1; beyond
 * about 4800 ml it's within 10^-5 of 1, so larger `n` returns 1.
 *
 * @see https://leetcode.com/problems/soup-servings/
 * @difficulty Medium
 * @timeComplexity O(1): at most 192² states
 * @spaceComplexity O(1)
 *
 * @example
 * soupServings(50); // 0.625
 */
export const soupServings = (n: number): number => {
	if (n > 4800) return 1;
	const units = Math.ceil(n / 25);
	const memo = new Map<number, number>();

	const probability = (a: number, b: number): number => {
		if (a <= 0 && b <= 0) return 0.5;
		if (a <= 0) return 1;
		if (b <= 0) return 0;
		const key = a * 1000 + b;
		const known = memo.get(key);
		if (known !== undefined) return known;
		const result =
			(probability(a - 4, b) +
				probability(a - 3, b - 1) +
				probability(a - 2, b - 2) +
				probability(a - 1, b - 3)) /
			4;
		memo.set(key, result);
		return result;
	};

	return probability(units, units);
};
