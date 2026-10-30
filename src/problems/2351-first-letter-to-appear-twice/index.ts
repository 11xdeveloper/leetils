/**
 * 2351. First Letter to Appear Twice
 *
 * Returns the first letter whose second occurrence comes earliest.
 *
 * @see https://leetcode.com/problems/first-letter-to-appear-twice/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * firstLetterToAppearTwice("abccbaacz"); // "c"
 */
export const firstLetterToAppearTwice = (s: string): string => {
	const seen = new Set<string>();
	for (const char of s) {
		if (seen.has(char)) return char;
		seen.add(char);
	}
	return "";
};
