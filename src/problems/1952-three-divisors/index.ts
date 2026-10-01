/**
 * 1952. Three Divisors
 *
 * Returns whether `n` has exactly three positive divisors.
 *
 * Exactly the squares of primes do.
 *
 * @see https://leetcode.com/problems/three-divisors/
 * @difficulty Easy
 * @timeComplexity O(n^(1/4))
 * @spaceComplexity O(1)
 *
 * @example
 * threeDivisors(4); // true
 */
export const threeDivisors = (n: number): boolean => {
	const root = Math.round(Math.sqrt(n));
	if (root * root !== n || root < 2) return false;
	for (let d = 2; d * d <= root; d++) if (root % d === 0) return false;
	return true;
};
