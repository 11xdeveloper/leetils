/**
 * 2523. Closest Prime Numbers in Range
 *
 * Returns the pair of primes in `[left, right]` that are closest
 * together, preferring the smaller pair, or `[-1, -1]` if there are fewer
 * than two primes.
 *
 * Sieve up to `right` and compare consecutive primes in the range.
 *
 * @see https://leetcode.com/problems/closest-prime-numbers-in-range/
 * @difficulty Medium
 * @timeComplexity O(right log log right)
 * @spaceComplexity O(right)
 *
 * @example
 * closestPrimeNumbersInRange(10, 19); // [11, 13]
 */
export const closestPrimeNumbersInRange = (
	left: number,
	right: number,
): number[] => {
	const composite = new Uint8Array(right + 1);
	for (let p = 2; p * p <= right; p++)
		if (!composite[p]) for (let m = p * p; m <= right; m += p) composite[m] = 1;

	let best = [-1, -1];
	let previous = -1;
	for (let x = Math.max(left, 2); x <= right; x++) {
		if (composite[x]) continue;
		if (
			previous !== -1 &&
			(best[0] === -1 || x - previous < (best[1] ?? 0) - (best[0] ?? 0))
		)
			best = [previous, x];
		previous = x;
	}
	return best;
};
