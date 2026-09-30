/**
 * 1021. Remove Outermost Parentheses
 *
 * Splits the balanced parentheses string `s` into its top-level groups and
 * removes the outer pair of each.
 *
 * Tracks the nesting depth, keeping every parenthesis except those that
 * open or close a top-level group.
 *
 * @see https://leetcode.com/problems/remove-outermost-parentheses/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * removeOutermostParentheses("(()())(())"); // "()()()"
 */
export const removeOutermostParentheses = (s: string): string => {
	let depth = 0;
	let result = "";
	for (const char of s) {
		if (char === "(" && depth++ > 0) result += char;
		if (char === ")" && --depth > 0) result += char;
	}
	return result;
};
