/**
 * 67. Add Binary
 *
 * Returns the sum of two binary strings as a binary string.
 *
 * Adds the digits from right to left like column addition, carrying into the
 * next column. Works on strings of any length, with no conversion to numbers.
 *
 * @see https://leetcode.com/problems/add-binary/
 * @difficulty Easy
 * @timeComplexity O(max(m, n))
 * @spaceComplexity O(max(m, n)) for the returned string
 *
 * @example
 * addBinary("11", "1"); // "100"
 * addBinary("1010", "1011"); // "10101"
 */
export const addBinary = (a: string, b: string): string => {
	const digits: number[] = [];
	let i = a.length - 1;
	let j = b.length - 1;
	let carry = 0;

	while (i >= 0 || j >= 0 || carry > 0) {
		// Reads before the start of a string are undefined, so count as 0.
		const sum = (a[i] === "1" ? 1 : 0) + (b[j] === "1" ? 1 : 0) + carry;
		digits.push(sum % 2);
		carry = sum > 1 ? 1 : 0;
		i--;
		j--;
	}

	return digits.reverse().join("");
};
