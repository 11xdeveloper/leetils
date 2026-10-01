/**
 * 902. Numbers At Most N Given Digit Set
 *
 * Counts the positive integers at most `n` written only with the given
 * `digits` (distinct, from 1 to 9, sorted, each usable repeatedly).
 *
 * Every number with fewer digits than `n` counts: `d^len` of each length.
 * For numbers as long as `n`, it walks `n`'s digits: at each position,
 * smaller available digits leave the rest free, and the digit itself (if
 * available) continues the comparison. Matching every digit counts `n`.
 *
 * @see https://leetcode.com/problems/numbers-at-most-n-given-digit-set/
 * @difficulty Hard
 * @timeComplexity O(log n · |digits|)
 * @spaceComplexity O(log n)
 *
 * @example
 * numbersAtMostNGivenDigitSet(["1", "3", "5", "7"], 100); // 20
 */
export const numbersAtMostNGivenDigitSet = (
	digits: readonly string[],
	n: number,
): number => {
	const text = String(n);
	const d = digits.length;
	let count = 0;
	for (let length = 1; length < text.length; length++) count += d ** length;

	for (let i = 0; i < text.length; i++) {
		const current = text.charAt(i);
		count +=
			digits.filter((digit) => digit < current).length *
			d ** (text.length - 1 - i);
		if (!digits.includes(current)) return count;
	}
	return count + 1;
};
