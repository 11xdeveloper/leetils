/**
 * 2521. Distinct Prime Factors of Product of Array
 *
 * Returns the number of distinct primes dividing the product of `nums`.
 *
 * Factor each number by trial division and collect the primes.
 *
 * @see https://leetcode.com/problems/distinct-prime-factors-of-product-of-array/
 * @difficulty Medium
 * @timeComplexity O(n √m), where `m` is the largest number
 * @spaceComplexity O(number of primes found)
 *
 * @example
 * distinctPrimeFactorsOfProductOfArray([2, 4, 3, 7, 10, 6]); // 4
 */
export const distinctPrimeFactorsOfProductOfArray = (
	nums: readonly number[],
): number => {
	const primes = new Set<number>();
	for (const num of nums) {
		let rest = num;
		for (let p = 2; p * p <= rest; p++)
			if (rest % p === 0) {
				primes.add(p);
				while (rest % p === 0) rest /= p;
			}
		if (rest > 1) primes.add(rest);
	}
	return primes.size;
};
