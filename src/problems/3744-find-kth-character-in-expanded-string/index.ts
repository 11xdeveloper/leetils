/**
 * 3744. Find Kth Character in Expanded String
 *
 * `s` is words separated by single spaces. Expanding repeats each word's
 * i-th letter (from 0) i + 1 times and keeps the spaces. Returns the k-th
 * character (from 0) of the expansion.
 *
 * A word of length L expands to L(L + 1)/2 characters, so skip whole
 * words, then the letters within one.
 *
 * @see https://leetcode.com/problems/find-kth-character-in-expanded-string/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * findKthCharacterInExpandedString("hello world", 0); // "h"
 */
export const findKthCharacterInExpandedString = (
	s: string,
	k: number,
): string => {
	for (const word of s.split(" ")) {
		const length = (word.length * (word.length + 1)) / 2;
		if (k < length) {
			for (let i = 0; ; i++) {
				if (k <= i) return word.charAt(i);
				k -= i + 1;
			}
		}
		k -= length;
		if (k === 0) return " ";
		k--;
	}
	return "";
};
