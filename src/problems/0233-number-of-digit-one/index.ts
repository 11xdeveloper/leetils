/**
 * 233. Number of Digit One
 *
 * Returns how many times the digit 1 appears when writing out every integer
 * from 0 to `n`.
 *
 * Counts the 1s in each decimal place separately. At the place with value
 * `p`, the digit is 1 for a block of `p` numbers in every `10p`: once per
 * full cycle above that place, plus part of a block depending on the digit
 * at that place in `n` itself.
 *
 * @see https://leetcode.com/problems/number-of-digit-one/
 * @difficulty Hard
 * @timeComplexity O(log n)
 * @spaceComplexity O(1)
 *
 * @example
 * numberOfDigitOne(13); // 6: 1, 10, 11 (twice), 12 and 13
 */
export const numberOfDigitOne = (n: number): number => {
	let count = 0;

	for (let place = 1; place <= n; place *= 10) {
		const higher = Math.floor(n / (place * 10));
		const digit = Math.floor(n / place) % 10;
		const lower = n % place;

		count += higher * place;
		if (digit === 1) count += lower + 1;
		else if (digit > 1) count += place;
	}

	return count;
};
