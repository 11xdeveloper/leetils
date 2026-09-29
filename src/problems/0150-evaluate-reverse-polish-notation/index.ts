const OPERATIONS: Readonly<Record<string, (a: number, b: number) => number>> = {
	"+": (a, b) => a + b,
	"-": (a, b) => a - b,
	"*": (a, b) => a * b,
	"/": (a, b) => Math.trunc(a / b),
};

/**
 * 150. Evaluate Reverse Polish Notation
 *
 * Evaluates an arithmetic expression in Reverse Polish Notation, where each
 * operator follows its two operands, like `["2", "1", "+", "3", "*"]` for
 * (2 + 1) × 3. Division truncates towards zero.
 *
 * Pushes numbers onto a stack; each operator pops two, applies itself and
 * pushes the result.
 *
 * @see https://leetcode.com/problems/evaluate-reverse-polish-notation/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * evaluateReversePolishNotation(["4", "13", "5", "/", "+"]); // 6
 */
export const evaluateReversePolishNotation = (
	tokens: readonly string[],
): number => {
	const stack: number[] = [];

	for (const token of tokens) {
		const operation = OPERATIONS[token];
		if (operation) {
			const b = stack.pop() ?? 0;
			const a = stack.pop() ?? 0;
			// `|| 0` turns a -0 from truncating a small negative quotient into 0.
			stack.push(operation(a, b) || 0);
		} else {
			stack.push(Number(token));
		}
	}

	return stack.pop() ?? 0;
};
