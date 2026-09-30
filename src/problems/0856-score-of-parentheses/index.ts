/**
 * 856. Score of Parentheses
 *
 * Scores a balanced parentheses string: `()` is 1, `AB` is `A + B`, and
 * `(A)` is `2 · A`.
 *
 * Every `()` contributes `2^depth`, where depth is how many pairs surround
 * it, since each enclosing pair doubles it. Summing those gives the score.
 *
 * @see https://leetcode.com/problems/score-of-parentheses/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * scoreOfParentheses("(()(()))"); // 6
 */
export const scoreOfParentheses = (s: string): number => {
	let score = 0;
	let depth = 0;
	for (let i = 0; i < s.length; i++) {
		if (s.charAt(i) === "(") {
			depth++;
		} else {
			depth--;
			if (s.charAt(i - 1) === "(") score += 2 ** depth;
		}
	}
	return score;
};
