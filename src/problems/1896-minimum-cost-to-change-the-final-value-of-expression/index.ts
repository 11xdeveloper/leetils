/**
 * 1896. Minimum Cost to Change the Final Value of Expression
 *
 * A boolean expression of `0`, `1`, `&`, `|` and parentheses evaluates left
 * to right (no precedence). Each operation flips one digit or operator.
 * Returns the fewest operations changing the expression's value.
 *
 * Evaluate with a stack of partial results, each a `[value, flipCost]`
 * pair. Combining two operands, the cheapest flip either flips one or both
 * operands or swaps the operator (cost 1):
 * - `1 & 1` or `0 | 0`: flip either operand.
 * - `0 & 0` or `1 | 1`: flip the operator and one operand, or both
 *   operands.
 * - mixed: swap the operator, or flip the operand that decides it.
 *
 * @see https://leetcode.com/problems/minimum-cost-to-change-the-final-value-of-expression/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * minimumCostToChangeTheFinalValueOfExpression("(0&0)&(0&0&0)"); // 3
 */
export const minimumCostToChangeTheFinalValueOfExpression = (
	expression: string,
): number => {
	type Result = readonly [value: number, cost: number];
	const combine = (
		[a, costA]: Result,
		operator: string,
		[b, costB]: Result,
	): Result => {
		const value = operator === "&" ? a & b : a | b;
		if (a === b) {
			// Equal operands: 1&1 and 0|0 flip with one operand; 0&0 and 1|1 need more.
			const easy = operator === "&" ? a === 1 : a === 0;
			return [
				value,
				easy
					? Math.min(costA, costB)
					: Math.min(costA + costB, 1 + Math.min(costA, costB)),
			];
		}
		// Mixed operands: swap the operator, or flip the operand that decides the result.
		const deciding =
			operator === "&" ? (a === 0 ? costA : costB) : a === 1 ? costA : costB;
		return [value, Math.min(1, deciding)];
	};
	// Each frame: the result so far in a parenthesised group, and the pending operator.
	const frames: [result: Result | undefined, operator: string][] = [
		[undefined, ""],
	];
	const push = (operand: Result) => {
		const frame = frames.at(-1);
		if (!frame) return;
		frame[0] = frame[0] ? combine(frame[0], frame[1], operand) : operand;
	};
	for (const char of expression) {
		if (char === "(") frames.push([undefined, ""]);
		else if (char === ")") push(frames.pop()?.[0] ?? [0, 1]);
		else if (char === "&" || char === "|") {
			const frame = frames.at(-1);
			if (frame) frame[1] = char;
		} else push([Number(char), 1]);
	}
	return frames[0]?.[0]?.[1] ?? 0;
};
