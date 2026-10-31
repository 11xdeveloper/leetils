/**
 * 3110. Score of a String
 *
 * The sum of the absolute differences between neighbouring letters' codes.
 *
 * Add them up.
 *
 * @see https://leetcode.com/problems/score-of-a-string/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * scoreOfAString("hello"); // 13
 */
export const scoreOfAString = (s: string): number => {
	let score = 0;
	for (let i = 1; i < s.length; i++)
		score += Math.abs(s.charCodeAt(i) - s.charCodeAt(i - 1));
	return score;
};
