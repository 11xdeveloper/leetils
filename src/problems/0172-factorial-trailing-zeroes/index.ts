/**
 * 172. Factorial Trailing Zeroes
 *
 * Returns how many zeros `n!` ends with.
 *
 * Each trailing zero comes from a factor of 10, that is a 2 and a 5. Factors
 * of 2 are always more plentiful, so it counts the factors of 5 in 1 to n:
 * one for every multiple of 5, another for every multiple of 25, and so on.
 *
 * @see https://leetcode.com/problems/factorial-trailing-zeroes/
 * @difficulty Medium
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * factorialTrailingZeroes(5); // 1, since 5! = 120
 */
export const factorialTrailingZeroes = (n: number): number => {
	let zeros = 0;

	for (let rest = Math.floor(n / 5); rest > 0; rest = Math.floor(rest / 5)) {
		zeros += rest;
	}

	return zeros;
};
