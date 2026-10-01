/**
 * 1999. Smallest Greater Multiple Made of Two Digits
 *
 * Returns the smallest multiple of `k` greater than `k` written only with
 * the digits `digit1` and `digit2`, or -1 if there is none up to
 * `2^31 − 1`.
 *
 * Numbers made of two digits are few (at most `2^10` per length up to 10
 * digits), so generate them in increasing order and check each.
 *
 * @see https://leetcode.com/problems/smallest-greater-multiple-made-of-two-digits/
 * @difficulty Medium
 * @timeComplexity O(2^10 · 10)
 * @spaceComplexity O(2^10)
 *
 * @example
 * smallestGreaterMultipleMadeOfTwoDigits(3, 4, 2); // 24
 */
export const smallestGreaterMultipleMadeOfTwoDigits = (
	k: number,
	digit1: number,
	digit2: number,
): number => {
	const LIMIT = 2 ** 31 - 1;
	const digits = [...new Set([digit1, digit2])].sort((a, b) => a - b);
	let level = digits.filter((d) => d > 0);
	while (level.length > 0) {
		for (const value of level)
			if (value > k && value <= LIMIT && value % k === 0) return value;
		level = level
			.flatMap((value) => digits.map((d) => value * 10 + d))
			.filter((value) => value <= LIMIT);
	}
	return -1;
};
