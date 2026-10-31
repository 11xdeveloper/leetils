/**
 * 2063. Vowels of All Substrings
 *
 * Returns the total number of vowels over all substrings of `word`.
 *
 * The character at `i` lies in `(i + 1) · (n - i)` substrings.
 *
 * @see https://leetcode.com/problems/vowels-of-all-substrings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * vowelsOfAllSubstrings("aba"); // 6
 */
export const vowelsOfAllSubstrings = (word: string): number => {
	let total = 0;
	for (const [i, char] of [...word].entries()) {
		if ("aeiou".includes(char)) total += (i + 1) * (word.length - i);
	}
	return total;
};
