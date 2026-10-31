/**
 * 3233. Find the Count of Numbers Which Are Not Special
 *
 * A number is special if it has exactly two proper divisors, which makes it
 * the square of a prime. Returns how many numbers from `l` to `r` aren't
 * special.
 *
 * Sieve primes up to √r and subtract those whose squares are in range.
 *
 * @see https://leetcode.com/problems/find-the-count-of-numbers-which-are-not-special/
 * @difficulty Medium
 * @timeComplexity O(√r log log r)
 * @spaceComplexity O(√r)
 *
 * @example
 * findTheCountOfNumbersWhichAreNotSpecial(4, 16); // 11
 */
export const findTheCountOfNumbersWhichAreNotSpecial = (
	l: number,
	r: number,
): number => {
	const limit = Math.floor(Math.sqrt(r));
	const composite = new Uint8Array(limit + 1);
	let special = 0;
	for (let p = 2; p <= limit; p++) {
		if (composite[p]) continue;
		for (let multiple = p * p; multiple <= limit; multiple += p)
			composite[multiple] = 1;
		if (p * p >= l) special++;
	}
	return r - l + 1 - special;
};
