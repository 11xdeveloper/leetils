/**
 * 201. Bitwise AND of Numbers Range
 *
 * Returns the bitwise AND of every integer from `left` to `right`,
 * inclusive.
 *
 * Any bit below the highest bit where `left` and `right` differ flips
 * somewhere in the range, so it ANDs to 0. The answer is their common
 * binary prefix followed by zeros, found by shifting both right until they
 * match.
 *
 * @see https://leetcode.com/problems/bitwise-and-of-numbers-range/
 * @difficulty Medium
 * @timeComplexity O(1), at most 31 shifts
 * @spaceComplexity O(1)
 *
 * @example
 * bitwiseAndOfNumbersRange(5, 7); // 4
 */
export const bitwiseAndOfNumbersRange = (
	left: number,
	right: number,
): number => {
	let a = left;
	let b = right;
	let shift = 0;

	while (a !== b) {
		a >>= 1;
		b >>= 1;
		shift++;
	}

	return a << shift;
};
