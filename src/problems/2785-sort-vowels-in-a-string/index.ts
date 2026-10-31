/**
 * 2785. Sort Vowels in a String
 *
 * Keeps every consonant in place and rearranges the vowels, of either
 * case, into non-decreasing ASCII order. Returns the result.
 *
 * Pull out the vowels, sort them, and put them back in order.
 *
 * @see https://leetcode.com/problems/sort-vowels-in-a-string/
 * @difficulty Medium
 * @timeComplexity O(n log n)
 * @spaceComplexity O(n)
 *
 * @example
 * sortVowelsInAString("lEetcOde"); // "lEOtcede"
 */
export const sortVowelsInAString = (s: string): string => {
	const isVowel = (c: string): boolean => "aeiouAEIOU".includes(c);
	const vowels = [...s].filter(isVowel).sort();
	let next = 0;
	return [...s].map((c) => (isVowel(c) ? (vowels[next++] ?? c) : c)).join("");
};
