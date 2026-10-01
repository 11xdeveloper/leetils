/**
 * 1614. Maximum Nesting Depth of the Parentheses
 *
 * Returns how deeply the parentheses of the valid expression `s` nest.
 *
 * Tracks the current depth and its maximum.
 *
 * @see https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * maximumNestingDepthOfTheParentheses("(1+(2*3)+((8)/4))+1"); // 3
 */
export const maximumNestingDepthOfTheParentheses = (s: string): number => {
	let [depth, deepest] = [0, 0];
	for (const char of s) {
		if (char === "(") depth++;
		else if (char === ")") depth--;
		deepest = Math.max(deepest, depth);
	}
	return deepest;
};
