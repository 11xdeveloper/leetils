/**
 * 3271. Hash Divided String
 *
 * Split `s` into chunks of length `k`; each chunk becomes the letter at the
 * sum of its letters' alphabet positions, mod 26.
 *
 * Add up each chunk's letter positions.
 *
 * @see https://leetcode.com/problems/hash-divided-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n / k)
 *
 * @example
 * hashDividedString("abcd", 2); // "bf"
 */
export const hashDividedString = (s: string, k: number): string => {
	let result = "";
	for (let i = 0; i < s.length; i += k) {
		let sum = 0;
		for (let j = i; j < i + k; j++) sum += s.charCodeAt(j) - 97;
		result += String.fromCharCode(97 + (sum % 26));
	}
	return result;
};
