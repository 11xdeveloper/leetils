/**
 * 1111. Maximum Nesting Depth of Two Valid Parentheses Strings
 *
 * Splits the valid parentheses string `seq` into two valid subsequences A
 * and B, keeping the larger of their nesting depths as small as possible.
 * Returns, for each character, 0 if it goes to A and 1 if it goes to B.
 *
 * Alternates nesting levels between the two: a pair of brackets at an odd
 * depth goes to A and one at an even depth to B, which halves the depth
 * (rounding up).
 *
 * @see https://leetcode.com/problems/maximum-nesting-depth-of-two-valid-parentheses-strings/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n), for the result
 *
 * @example
 * maximumNestingDepthOfTwoValidParenthesesStrings("(()())"); // [0, 1, 1, 1, 1, 0]
 */
export const maximumNestingDepthOfTwoValidParenthesesStrings = (
	seq: string,
): number[] => {
	const result: number[] = [];
	let depth = 0;
	for (const char of seq) {
		if (char === "(") {
			depth++;
			result.push((depth + 1) % 2);
		} else {
			result.push((depth + 1) % 2);
			depth--;
		}
	}
	return result;
};
