/**
 * 1447. Simplified Fractions
 *
 * Returns every fraction strictly between 0 and 1 in lowest terms with
 * denominator at most `n`, written as `"a/b"`.
 *
 * Tries every numerator and denominator, keeping those with no common
 * factor.
 *
 * @see https://leetcode.com/problems/simplified-fractions/
 * @difficulty Medium
 * @timeComplexity O(n^2 log n)
 * @spaceComplexity O(n^2), for the result
 *
 * @example
 * simplifiedFractions(4); // ["1/2", "1/3", "2/3", "1/4", "3/4"]
 */
export const simplifiedFractions = (n: number): string[] => {
	const gcd = (a: number, b: number): number => {
		while (b !== 0) [a, b] = [b, a % b];
		return a;
	};
	const fractions: string[] = [];
	for (let denominator = 2; denominator <= n; denominator++) {
		for (let numerator = 1; numerator < denominator; numerator++) {
			if (gcd(numerator, denominator) === 1)
				fractions.push(`${numerator}/${denominator}`);
		}
	}
	return fractions;
};
