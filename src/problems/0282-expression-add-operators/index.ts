/**
 * 282. Expression Add Operators
 *
 * Returns every way to insert `+`, `-` or `*` between the digits of `num` so
 * that the expression evaluates to `target`. Operands can't have leading
 * zeros.
 *
 * Backtracking over where each operand ends and which operator precedes it.
 * It tracks the value so far and the last term added: since `*` binds
 * tighter, multiplying undoes that term and adds back the term times the
 * new operand.
 *
 * @see https://leetcode.com/problems/expression-add-operators/
 * @difficulty Hard
 * @timeComplexity O(n * 4^n)
 * @spaceComplexity O(n) excluding the returned expressions
 *
 * @example
 * expressionAddOperators("123", 6); // ["1+2+3", "1*2*3"]
 */
export const expressionAddOperators = (
	num: string,
	target: number,
): string[] => {
	const expressions: string[] = [];

	const search = (
		start: number,
		expression: string,
		value: number,
		lastTerm: number,
	): void => {
		if (start === num.length) {
			if (value === target) expressions.push(expression);
			return;
		}

		for (let end = start + 1; end <= num.length; end++) {
			// A multi-digit operand can't start with 0.
			if (end > start + 1 && num[start] === "0") break;
			const digits = num.slice(start, end);
			const operand = Number(digits);

			if (start === 0) {
				search(end, digits, operand, operand);
				continue;
			}
			search(end, `${expression}+${digits}`, value + operand, operand);
			search(end, `${expression}-${digits}`, value - operand, -operand);
			search(
				end,
				`${expression}*${digits}`,
				value - lastTerm + lastTerm * operand,
				lastTerm * operand,
			);
		}
	};

	search(0, "", 0, 0);
	return expressions;
};
