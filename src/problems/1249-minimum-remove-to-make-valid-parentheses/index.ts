/**
 * 1249. Minimum Remove to Make Valid Parentheses
 *
 * Removes as few parentheses as possible from `s` to leave a valid string,
 * and returns it.
 *
 * Matches parentheses with a stack of open positions. A `)` with nothing
 * to match is removed, as are any `(` still unmatched at the end.
 *
 * @see https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumRemoveToMakeValidParentheses("lee(t(c)o)de)"); // "lee(t(c)o)de"
 */
export const minimumRemoveToMakeValidParentheses = (s: string): string => {
	const chars = [...s];
	const open: number[] = [];
	chars.forEach((char, i) => {
		if (char === "(") open.push(i);
		else if (char === ")") {
			if (open.length > 0) open.pop();
			else chars[i] = "";
		}
	});
	for (const i of open) chars[i] = "";
	return chars.join("");
};
