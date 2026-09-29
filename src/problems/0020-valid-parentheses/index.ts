const OPENING_FOR: ReadonlyMap<string, string> = new Map([
	[")", "("],
	["]", "["],
	["}", "{"],
]);

/**
 * 20. Valid Parentheses
 *
 * Returns whether every bracket in `s`, which contains only `()[]{}`, is
 * closed by the same type of bracket in the correct order.
 *
 * Pushes opening brackets onto a stack. Each closing bracket must match the
 * bracket on top of the stack, and the stack must be empty at the end.
 *
 * @see https://leetcode.com/problems/valid-parentheses/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * validParentheses("()[]{}"); // true
 * validParentheses("(]"); // false
 * validParentheses("([)]"); // false
 */
export const validParentheses = (s: string): boolean => {
	const stack: string[] = [];

	for (const char of s) {
		const opening = OPENING_FOR.get(char);
		if (opening === undefined) stack.push(char);
		else if (stack.pop() !== opening) return false;
	}

	return stack.length === 0;
};
