/**
 * 22. Generate Parentheses
 *
 * Returns every well-formed string of `n` pairs of parentheses.
 *
 * Builds strings one character at a time, adding `(` while fewer than `n`
 * have been used, and `)` only while it would close an open `(`. Every
 * string built this way is well-formed, so none are wasted.
 *
 * @see https://leetcode.com/problems/generate-parentheses/
 * @difficulty Medium
 * @timeComplexity O(4^n / sqrt(n)), the nth Catalan number of strings
 * @spaceComplexity O(n) excluding the returned strings
 *
 * @example
 * generateParentheses(3); // ["((()))", "(()())", "(())()", "()(())", "()()()"]
 */
export const generateParentheses = (n: number): string[] => {
	const results: string[] = [];

	const build = (current: string, open: number, closed: number): void => {
		if (current.length === 2 * n) {
			results.push(current);
			return;
		}
		if (open < n) build(`${current}(`, open + 1, closed);
		if (closed < open) build(`${current})`, open, closed + 1);
	};

	build("", 0, 0);
	return results;
};
