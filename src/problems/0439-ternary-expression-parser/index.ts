/**
 * 439. Ternary Expression Parser
 *
 * Evaluates a nested ternary expression of single digits, `T` and `F`, like
 * `"F?1:T?4:5"`, and returns the result as a one-character string. Ternaries
 * group right to left.
 *
 * Reads the expression from right to left with a stack of values. A `?`
 * means the value on top is the true branch and the one below the false
 * branch, and the character before the `?` picks one.
 *
 * @see https://leetcode.com/problems/ternary-expression-parser/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * ternaryExpressionParser("F?1:T?4:5"); // "4"
 */
export const ternaryExpressionParser = (expression: string): string => {
	const stack: string[] = [];

	for (let i = expression.length - 1; i >= 0; i--) {
		const char = expression.charAt(i);
		if (char === ":") continue;
		if (char === "?") {
			const condition = expression.charAt(--i);
			const whenTrue = stack.pop() ?? "";
			const whenFalse = stack.pop() ?? "";
			stack.push(condition === "T" ? whenTrue : whenFalse);
		} else {
			stack.push(char);
		}
	}

	return stack.pop() ?? "";
};
