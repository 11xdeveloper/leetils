/**
 * 186. Reverse Words in a String II
 *
 * Reverses the order of the words in a character array, in place, as the
 * problem requires. Words are separated by single spaces, with none at
 * either end.
 *
 * Reversing the whole array puts the words in the right order but spells
 * each one backwards, so reversing each word again fixes them.
 *
 * @see https://leetcode.com/problems/reverse-words-in-a-string-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const s = [..."the sky is blue"];
 * reverseWordsInAStringII(s); // s now spells "blue is sky the"
 */
export const reverseWordsInAStringII = (s: string[]): void => {
	const reverse = (start: number, end: number): void => {
		for (let i = start, j = end; i < j; i++, j--) {
			const temp = s[i] ?? "";
			s[i] = s[j] ?? "";
			s[j] = temp;
		}
	};

	reverse(0, s.length - 1);
	for (let start = 0, end = 0; end <= s.length; end++) {
		if (end === s.length || s[end] === " ") {
			reverse(start, end - 1);
			start = end + 1;
		}
	}
};
