/**
 * 3120. Count the Number of Special Characters I
 *
 * How many letters appear in `word` in both lower and upper case.
 *
 * Collect the characters in a set and check each letter both ways.
 *
 * @see https://leetcode.com/problems/count-the-number-of-special-characters-i/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * countTheNumberOfSpecialCharactersI("aaAbcBC"); // 3
 */
export const countTheNumberOfSpecialCharactersI = (word: string): number => {
	const seen = new Set(word);
	let count = 0;
	for (let letter = 0; letter < 26; letter++)
		if (
			seen.has(String.fromCharCode(97 + letter)) &&
			seen.has(String.fromCharCode(65 + letter))
		)
			count++;
	return count;
};
