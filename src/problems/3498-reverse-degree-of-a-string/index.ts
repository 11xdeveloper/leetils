/**
 * 3498. Reverse Degree of a String
 *
 * Add up, for each letter, its position in the string (from 1) times its
 * position in the reversed alphabet ('a' is 26, 'z' is 1).
 *
 * Add the products.
 *
 * @see https://leetcode.com/problems/reverse-degree-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseDegreeOfAString("abc"); // 148
 */
export const reverseDegreeOfAString = (s: string): number => {
	let total = 0;
	for (let i = 0; i < s.length; i++)
		total += (i + 1) * (26 - (s.charCodeAt(i) - 97));
	return total;
};
