/**
 * 1106. Parsing A Boolean Expression
 *
 * Evaluates a boolean expression made of `t`, `f`, `!(e)`, `&(e1,e2,…)` and
 * `|(e1,e2,…)`.
 *
 * Pushes characters onto a stack, skipping commas. At each `)`, pops the
 * values back to the `(`, pops the operator in front of it, and pushes the
 * result.
 *
 * @see https://leetcode.com/problems/parsing-a-boolean-expression/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * parsingABooleanExpression("!(&(f,t))"); // true
 */
export const parsingABooleanExpression = (expression: string): boolean => {
	const stack: string[] = [];
	for (const char of expression) {
		if (char === ",") continue;
		if (char !== ")") {
			stack.push(char);
			continue;
		}
		let [anyTrue, anyFalse] = [false, false];
		for (let top = stack.pop(); top !== "("; top = stack.pop()) {
			if (top === "t") anyTrue = true;
			else anyFalse = true;
		}
		const operator = stack.pop();
		const value =
			operator === "!" ? anyFalse : operator === "&" ? !anyFalse : anyTrue;
		stack.push(value ? "t" : "f");
	}
	return stack[0] === "t";
};
