/**
 * Given two binary strings a and b, return their sum as a binary string.
 * The strings contain only 0 or 1 characters.
 *
 * @param strs - Array of binary strings to add
 * @returns The sum of the binary strings as a binary string
 *
 * @example
 * Input: a = "11", b = "1"
 * Output: "100"
 * Explanation: 11 + 1 = 100 (in binary)
 *
 * @example
 * Input: a = "1010", b = "1011"
 * Output: "10101"
 * Explanation: 1010 + 1011 = 10101 (in binary)
 *
 * @timeComplexity O(max(n,m)) - where n and m are the lengths of the input strings
 * @spaceComplexity O(max(n,m)) - to store the result string
 */
export const addBinary = (...strs: string[]): string =>
	strs
		.map((str) => BigInt(`0b${str}`))
		.reduce((a, b) => a + b, BigInt(0))
		.toString(2);
