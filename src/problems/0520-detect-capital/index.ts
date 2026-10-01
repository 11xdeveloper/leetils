/**
 * 520. Detect Capital
 *
 * Returns whether `word` uses capitals correctly: all capitals (`"USA"`),
 * no capitals (`"leetcode"`), or only the first letter (`"Google"`).
 *
 * Any capital after the first letter means every letter must be a capital.
 * Otherwise the word is fine whatever its first letter.
 *
 * @see https://leetcode.com/problems/detect-capital/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * detectCapital("FlaG"); // false
 */
export const detectCapital = (word: string): boolean => {
	const rest = word.slice(1);
	return rest === rest.toLowerCase() || word === word.toUpperCase();
};
