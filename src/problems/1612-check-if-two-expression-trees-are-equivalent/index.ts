import type { ExpressionTreeNode } from "../../structures/expression-tree-node";

/**
 * 1612. Check If Two Expression Trees are Equivalent
 *
 * Both trees use only `+` and single-letter variables. Returns whether they
 * always evaluate to the same value.
 *
 * A sum of variables is determined by how many times each variable
 * appears, so compare the letter counts of the two trees' leaves (walked
 * with an explicit stack).
 *
 * @see https://leetcode.com/problems/check-if-two-expression-trees-are-equivalent/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * checkIfTwoExpressionTreesAreEquivalent(expressionTreeFromArray(["+", "a", "+", null, null, "b", "c"]), expressionTreeFromArray(["+", "+", "a", "b", "c"])); // true
 */
export const checkIfTwoExpressionTreesAreEquivalent = (
	root1: ExpressionTreeNode | null,
	root2: ExpressionTreeNode | null,
): boolean => {
	const counts = new Map<string, number>();
	for (const [root, sign] of [
		[root1, 1],
		[root2, -1],
	] as const) {
		const stack = root ? [root] : [];
		for (let node = stack.pop(); node; node = stack.pop()) {
			if (node.left) stack.push(node.left);
			if (node.right) stack.push(node.right);
			if (node.val !== "+")
				counts.set(node.val, (counts.get(node.val) ?? 0) + sign);
		}
	}
	return [...counts.values()].every((count) => count === 0);
};
