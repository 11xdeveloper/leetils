/**
 * 1704. Determine if String Halves Are Alike
 *
 * Returns whether both halves of the even-length `s` contain the same
 * number of vowels (either case).
 *
 * Counts vowels in each half.
 *
 * @see https://leetcode.com/problems/determine-if-string-halves-are-alike/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * determineIfStringHalvesAreAlike("book"); // true
 */
export const determineIfStringHalvesAreAlike = (s: string): boolean => {
	const vowels = (half: string) =>
		[...half].filter((char) => "aeiouAEIOU".includes(char)).length;
	return vowels(s.slice(0, s.length / 2)) === vowels(s.slice(s.length / 2));
};
