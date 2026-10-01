/**
 * 32. Longest Valid Parentheses
 *
 * Returns the length of the longest well-formed substring of parentheses in
 * `s`, which contains only `(` and `)`.
 *
 * Counts opening and closing parentheses from left to right: when the counts
 * are equal, they form a valid substring; when closing ones outnumber opening
 * ones, no valid substring can continue, so the counts reset. A second pass
 * from right to left catches substrings that the first pass misses because
 * of an unclosed `(` before them, like in `(()`.
 *
 * @see https://leetcode.com/problems/longest-valid-parentheses/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * longestValidParentheses(")()())"); // 4, for "()()"
 */
export const longestValidParentheses = (s: string): number => {
	let longest = 0;
	let open = 0;
	let close = 0;

	for (let i = 0; i < s.length; i++) {
		if (s[i] === "(") open++;
		else close++;

		if (open === close) longest = Math.max(longest, 2 * close);
		else if (close > open) open = close = 0;
	}

	open = close = 0;
	for (let i = s.length - 1; i >= 0; i--) {
		if (s[i] === "(") open++;
		else close++;

		if (open === close) longest = Math.max(longest, 2 * open);
		else if (open > close) open = close = 0;
	}

	return longest;
};
