/**
 * 1016. Binary String With Substrings Representing 1 To N
 *
 * Returns whether the binary representation of every integer from 1 to `n`
 * is a substring of `s`.
 *
 * If `x` appears, so does `x >> 1` (drop its last bit), so only the numbers
 * above `n / 2` need checking. Those have at most two bit lengths, and `s`
 * has at most `s.length` substrings of each length, so a large `n` fails
 * straight away and the loop stays short.
 *
 * @see https://leetcode.com/problems/binary-string-with-substrings-representing-1-to-n/
 * @difficulty Medium
 * @timeComplexity O(|s|^2) at most
 * @spaceComplexity O(log n)
 *
 * @example
 * binaryStringWithSubstringsRepresenting1ToN("0110", 3); // true
 */
export const binaryStringWithSubstringsRepresenting1ToN = (
	s: string,
	n: number,
): boolean => {
	if (n - Math.floor(n / 2) > 2 * s.length) return false;
	for (let x = n; x > Math.floor(n / 2); x--)
		if (!s.includes(x.toString(2))) return false;
	return true;
};
