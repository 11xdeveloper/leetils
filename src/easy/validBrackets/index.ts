import { BracketPairMapping } from "../../lib/constants";

/**
 * Given a string s containing just the characters '(', ')', '{', '}', '[' and ']',
 * determine if the input string is valid.
 *
 * An input string is valid if:
 * 1. Open brackets must be closed by the same type of brackets.
 * 2. Open brackets must be closed in the correct order.
 * 3. Every close bracket has a corresponding open bracket of the same type.
 *
 * @param str - String containing bracket characters
 * @returns true if the brackets are valid, false otherwise
 *
 * @example
 * Input: s = "()"
 * Output: true
 *
 * @example
 * Input: s = "()[]{}"
 * Output: true
 *
 * @example
 * Input: s = "(]"
 * Output: false
 *
 * @example
 * Input: s = "([)]"
 * Output: false
 *
 * @timeComplexity O(n) - Single pass through the string
 * @spaceComplexity O(n) - Stack can grow up to the size of the string
 */
export const validBrackets = (str: string): boolean => {
	const stack: string[] = [];

	for (const char of str) {
		if (BracketPairMapping.has(char)) stack.push(char);
		else if (
			stack.length === 0 ||
			BracketPairMapping.get(stack.pop()!) !== char
		)
			return false;
	}

	return stack.length === 0;
};
