/**
 * 3770. Largest Prime from Consecutive Prime Sum
 *
 * The largest prime at most `n` that is a sum of consecutive primes
 * starting from 2, or 0.
 *
 * Sieve, then check the running sums of primes.
 *
 * @see https://leetcode.com/problems/largest-prime-from-consecutive-prime-sum/
 * @difficulty Medium
 * @timeComplexity O(n log log n)
 * @spaceComplexity O(n)
 *
 * @example
 * largestPrimeFromConsecutivePrimeSum(20); // 17
 */
export const largestPrimeFromConsecutivePrimeSum = (n: number): number => {
	const composite = new Uint8Array(n + 1);
	let best = 0;
	let sum = 0;
	for (let p = 2; p <= n; p++) {
		if (composite[p]) continue;
		for (let x = p * p; x <= n; x += p) composite[x] = 1;
	}
	for (let p = 2; p <= n; p++) {
		if (composite[p]) continue;
		sum += p;
		if (sum > n) break;
		if (!composite[sum]) best = sum;
	}
	return best;
};
