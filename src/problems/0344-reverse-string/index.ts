/**
 * 344. Reverse String
 *
 * Reverses an array of characters in place, as the problem requires, using
 * O(1) extra memory.
 *
 * Swaps characters from both ends, moving inwards.
 *
 * @see https://leetcode.com/problems/reverse-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const s = ["h", "e", "l", "l", "o"];
 * reverseString(s); // s is now ["o", "l", "l", "e", "h"]
 */
export const reverseString = (s: string[]): void => {
	for (let i = 0, j = s.length - 1; i < j; i++, j--) {
		const temp = s[i] ?? "";
		s[i] = s[j] ?? "";
		s[j] = temp;
	}
};
