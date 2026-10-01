import { ExpressionTreeNode } from "../../structures/expression-tree-node";

/**
 * 1597. Build Binary Expression Tree From Infix Expression
 *
 * Builds an expression tree for the infix expression `s` (single-digit
 * operands, `+ - * /` and parentheses) that respects precedence and
 * evaluates operators of equal precedence left to right.
 *
 * The shunting-yard algorithm, building subtrees instead of output: operands
 * become leaves, and an operator is applied to the top two subtrees once a
 * later operator of no higher precedence (or a closing parenthesis or the
 * end) arrives.
 *
 * @see https://leetcode.com/problems/build-binary-expression-tree-from-infix-expression/
 * @difficulty Hard
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * expressionTreeToArray(buildBinaryExpressionTreeFromInfixExpression("3*4-2*5")); // ["-", "*", "*", "3", "4", "2", "5"]
 */
export const buildBinaryExpressionTreeFromInfixExpression = (
	s: string,
): ExpressionTreeNode | null => {
	const precedence: Record<string, number> = { "+": 1, "-": 1, "*": 2, "/": 2 };
	const trees: ExpressionTreeNode[] = [];
	const operators: string[] = [];
	const apply = () => {
		const operator = operators.pop() ?? "+";
		const right = trees.pop() ?? null;
		const left = trees.pop() ?? null;
		trees.push(new ExpressionTreeNode(operator, left, right));
	};
	for (const char of s) {
		if (char >= "0" && char <= "9") trees.push(new ExpressionTreeNode(char));
		else if (char === "(") operators.push(char);
		else if (char === ")") {
			while (operators.at(-1) !== "(") apply();
			operators.pop();
		} else {
			while (
				(precedence[operators.at(-1) ?? ""] ?? 0) >= (precedence[char] ?? 0)
			)
				apply();
			operators.push(char);
		}
	}
	while (operators.length > 0) apply();
	return trees[0] ?? null;
};
