/**
 * 3210. Find the Encrypted String
 *
 * Replace each letter of `s` with the letter `k` places after it,
 * cyclically.
 *
 * Rotate the string left by `k mod n`.
 *
 * @see https://leetcode.com/problems/find-the-encrypted-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findTheEncryptedString("dart", 3); // "tdar"
 */
export const findTheEncryptedString = (s: string, k: number): string => {
	const shift = k % s.length;
	return s.slice(shift) + s.slice(0, shift);
};
