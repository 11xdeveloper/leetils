/**
 * 772. Basic Calculator III
 *
 * Evaluates an expression of non-negative integers, `+`, `-`, `*`, `/` and
 * parentheses, with the usual precedence and division truncating towards
 * zero.
 *
 * Operator-precedence parsing with a stack of values and a stack of
 * operators, applying operators as soon as a new one of lower or equal
 * precedence arrives or a `)` closes their group. No recursion, so deeply
 * nested parentheses are fine.
 *
 * @see https://leetcode.com/problems/basic-calculator-iii/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * basicCalculatorIII("2*(5+5*2)/3+(6/2+8)"); // 21
 */
export const basicCalculatorIII = (s: string): number => {
	const values: number[] = [];
	const operators: string[] = [];
	const precedence = (operator: string): number =>
		operator === "*" || operator === "/" ? 2 : operator === "(" ? 0 : 1;
	const apply = (): void => {
		const b = values.pop() ?? 0;
		const a = values.pop() ?? 0;
		const operator = operators.pop();
		if (operator === "+") values.push(a + b);
		else if (operator === "-") values.push(a - b);
		else if (operator === "*") values.push(a * b);
		else values.push(Math.trunc(a / b));
	};

	for (let i = 0; i < s.length; i++) {
		const char = s.charAt(i);
		if (char === " ") continue;
		if (/\d/.test(char)) {
			let value = 0;
			while (i < s.length && /\d/.test(s.charAt(i)))
				value = value * 10 + Number(s.charAt(i++));
			i--;
			values.push(value);
		} else if (char === "(") {
			operators.push(char);
		} else if (char === ")") {
			while (operators.at(-1) !== "(") apply();
			operators.pop();
		} else {
			while (
				operators.length > 0 &&
				precedence(operators.at(-1) ?? "(") >= precedence(char)
			)
				apply();
			operators.push(char);
		}
	}
	while (operators.length > 0) apply();

	return values[0] ?? 0;
};
