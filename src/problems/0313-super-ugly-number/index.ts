/**
 * 313. Super Ugly Number
 *
 * Returns the `n`th super ugly number: the `n`th positive integer whose
 * prime factors all appear in `primes`, counting 1 as the first.
 *
 * Generalises Ugly Number II: one pointer per prime into the numbers found
 * so far. Each step takes the smallest candidate (a found number times its
 * prime) and advances every pointer that produced it, so each number
 * appears once.
 *
 * @see https://leetcode.com/problems/super-ugly-number/
 * @difficulty Medium
 * @timeComplexity O(n * k) where k is the number of primes
 * @spaceComplexity O(n + k)
 *
 * @example
 * superUglyNumber(12, [2, 7, 13, 19]); // 32
 */
export const superUglyNumber = (
	n: number,
	primes: readonly number[],
): number => {
	const ugly = [1];
	const pointers = new Array<number>(primes.length).fill(0);

	while (ugly.length < n) {
		const candidates = primes.map(
			(prime, i) => (ugly[pointers[i] ?? 0] ?? 1) * prime,
		);
		const next = Math.min(...candidates);
		ugly.push(next);
		for (const [i, candidate] of candidates.entries()) {
			if (candidate === next) pointers[i] = (pointers[i] ?? 0) + 1;
		}
	}

	return ugly[n - 1] ?? 1;
};
