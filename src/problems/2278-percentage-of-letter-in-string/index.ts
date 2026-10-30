/**
 * 2278. Percentage of Letter in String
 *
 * Returns the percentage of `s` that is `letter`, rounded down.
 *
 * @see https://leetcode.com/problems/percentage-of-letter-in-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * percentageOfLetterInString("foobar", "o"); // 33
 */
export const percentageOfLetterInString = (s: string, letter: string): number =>
	Math.floor((100 * (s.split(letter).length - 1)) / s.length);
