/**
 * 3345. Smallest Divisible Digit Product I
 *
 * The smallest number at least `n` whose digits multiply to a multiple of
 * `t`.
 *
 * Count up from `n`; a 0 digit always works, so it's never far.
 *
 * @see https://leetcode.com/problems/smallest-divisible-digit-product-i/
 * @difficulty Easy
 * @timeComplexity O(log n) per candidate, and few candidates
 * @spaceComplexity O(1)
 *
 * @example
 * smallestDivisibleDigitProductI(15, 3); // 16
 */
export const smallestDivisibleDigitProductI = (
	n: number,
	t: number,
): number => {
	for (let candidate = n; ; candidate++) {
		let product = 1;
		for (let rest = candidate; rest > 0; rest = Math.floor(rest / 10))
			product *= rest % 10;
		if (product % t === 0) return candidate;
	}
};
