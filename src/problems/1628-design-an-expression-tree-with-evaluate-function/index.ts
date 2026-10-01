/** A node of an arithmetic expression tree that can evaluate itself. */
export interface ExpressionNode {
	evaluate(): number;
}

/** A number at a leaf. */
class Operand implements ExpressionNode {
	readonly #value: number;

	constructor(value: number) {
		this.#value = value;
	}

	evaluate(): number {
		return this.#value;
	}
}

/** An operator applied to two subtrees. */
class Operation implements ExpressionNode {
	readonly #apply: (left: number, right: number) => number;
	readonly #left: ExpressionNode;
	readonly #right: ExpressionNode;

	constructor(
		apply: (left: number, right: number) => number,
		left: ExpressionNode,
		right: ExpressionNode,
	) {
		this.#apply = apply;
		this.#left = left;
		this.#right = right;
	}

	evaluate(): number {
		return this.#apply(this.#left.evaluate(), this.#right.evaluate());
	}
}

/** Supporting another operator only takes another entry here. */
const OPERATORS: Readonly<
	Record<string, (left: number, right: number) => number>
> = {
	"+": (left, right) => left + right,
	"-": (left, right) => left - right,
	"*": (left, right) => left * right,
	"/": (left, right) => Math.trunc(left / right),
};

/**
 * 1628. Design an Expression Tree With Evaluate Function
 *
 * Builds an expression tree from `postfix` tokens (integers and
 * `+ - * /`, with division truncating) whose root's `evaluate()` returns
 * the expression's value.
 *
 * A stack of subtrees: numbers push leaves, and an operator pops its right
 * then left operand. For the follow-up, operators live in a lookup table
 * of functions, so a new one never touches `evaluate`.
 *
 * @see https://leetcode.com/problems/design-an-expression-tree-with-evaluate-function/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * designAnExpressionTreeWithEvaluateFunction(["3", "4", "+", "2", "*", "7", "/"]).evaluate(); // 2
 */
export const designAnExpressionTreeWithEvaluateFunction = (
	postfix: readonly string[],
): ExpressionNode => {
	const stack: ExpressionNode[] = [];
	for (const token of postfix) {
		const apply = OPERATORS[token];
		if (!apply) {
			stack.push(new Operand(Number(token)));
			continue;
		}
		const right = stack.pop() ?? new Operand(0);
		const left = stack.pop() ?? new Operand(0);
		stack.push(new Operation(apply, left, right));
	}
	return stack.pop() ?? new Operand(0);
};
