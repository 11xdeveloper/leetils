/**
 * 921. Minimum Add to Make Parentheses Valid
 *
 * Returns the fewest parentheses to insert into `s` to make it balanced.
 *
 * Tracks the unmatched `(`s. A `)` with none to match needs a `(` inserted;
 * the `(`s still open at the end each need a `)`.
 *
 * @see https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * minimumAddToMakeParenthesesValid("())"); // 1
 */
export const minimumAddToMakeParenthesesValid = (s: string): number => {
	let open = 0;
	let added = 0;
	for (const char of s) {
		if (char === "(") open++;
		else if (open > 0) open--;
		else added++;
	}
	return added + open;
};
