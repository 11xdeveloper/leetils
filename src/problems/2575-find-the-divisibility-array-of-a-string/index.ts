/**
 * 2575. Find the Divisibility Array of a String
 *
 * Returns, for each prefix of the digit string `word`, 1 if its value is
 * divisible by `m` and 0 otherwise.
 *
 * Carry the prefix's remainder modulo `m` along.
 *
 * @see https://leetcode.com/problems/find-the-divisibility-array-of-a-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheDivisibilityArrayOfAString("1010", 10); // [0, 1, 0, 1]
 */
export const findTheDivisibilityArrayOfAString = (
	word: string,
	m: number,
): number[] => {
	let remainder = 0;
	return [...word].map((digit) => {
		remainder = (remainder * 10 + Number(digit)) % m;
		return remainder === 0 ? 1 : 0;
	});
};
