/**
 * 2507. Smallest Value After Replacing With Sum of Prime Factors
 *
 * Repeatedly replaces `n` with the sum of its prime factors, counted with
 * multiplicity. Returns the value it settles on.
 *
 * The sum never exceeds `n`, and equals it only for primes and 4, so
 * repeat until it stops changing.
 *
 * @see https://leetcode.com/problems/smallest-value-after-replacing-with-sum-of-prime-factors/
 * @difficulty Medium
 * @timeComplexity O(√n log n)
 * @spaceComplexity O(1)
 *
 * @example
 * smallestValueAfterReplacingWithSumOfPrimeFactors(15); // 5
 */
export const smallestValueAfterReplacingWithSumOfPrimeFactors = (
	n: number,
): number => {
	for (;;) {
		let sum = 0;
		let rest = n;
		for (let p = 2; p * p <= rest; p++)
			while (rest % p === 0) {
				sum += p;
				rest /= p;
			}
		if (rest > 1) sum += rest;
		if (sum === n) return n;
		n = sum;
	}
};
