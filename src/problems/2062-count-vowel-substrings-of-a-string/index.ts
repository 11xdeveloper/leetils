/**
 * 2062. Count Vowel Substrings of a String
 *
 * Counts the substrings made only of vowels that contain all five.
 *
 * Extend a substring from each start until a consonant, counting those
 * that have seen all five vowels.
 *
 * @see https://leetcode.com/problems/count-vowel-substrings-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n^2)
 * @spaceComplexity O(1)
 *
 * @example
 * countVowelSubstringsOfAString("aeiouu"); // 2
 */
export const countVowelSubstringsOfAString = (word: string): number => {
	let count = 0;
	for (let start = 0; start < word.length; start++) {
		const vowels = new Set<string>();
		for (let end = start; end < word.length; end++) {
			const char = word[end] ?? "";
			if (!"aeiou".includes(char)) break;
			vowels.add(char);
			if (vowels.size === 5) count++;
		}
	}
	return count;
};
