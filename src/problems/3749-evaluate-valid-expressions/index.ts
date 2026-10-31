/**
 * 3749. Evaluate Valid Expressions
 *
 * Evaluates an expression built from integers and the functions
 * `add(a,b)`, `sub(a,b)`, `mul(a,b)` and `div(a,b)` (integer division,
 * rounding toward zero).
 *
 * Recursive descent, in BigInt so intermediate products stay exact.
 *
 * @see https://leetcode.com/problems/evaluate-valid-expressions/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * evaluateValidExpressions("add(2,mul(3,4))"); // 14
 */
export const evaluateValidExpressions = (expression: string): number => {
	let i = 0;
	const parse = (): bigint => {
		if (/[a-z]/.test(expression.charAt(i))) {
			const name = expression.slice(i, i + 3);
			i += 4;
			const a = parse();
			i++;
			const b = parse();
			i++;
			if (name === "add") return a + b;
			if (name === "sub") return a - b;
			if (name === "mul") return a * b;
			return a / b;
		}
		const start = i;
		if (expression.charAt(i) === "-") i++;
		while (/\d/.test(expression.charAt(i))) i++;
		return BigInt(expression.slice(start, i));
	};
	return Number(parse());
};
