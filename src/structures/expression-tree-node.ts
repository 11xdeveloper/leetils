/**
 * A binary expression tree node holding an operator or a single-digit
 * operand as a string, matching the `Node` class LeetCode provides for
 * problems like Build Binary Expression Tree From Infix Expression.
 */
export class ExpressionTreeNode {
	val: string;
	left: ExpressionTreeNode | null;
	right: ExpressionTreeNode | null;

	constructor(
		val?: string,
		left?: ExpressionTreeNode | null,
		right?: ExpressionTreeNode | null,
	) {
		this.val = val ?? " ";
		this.left = left ?? null;
		this.right = right ?? null;
	}
}

/**
 * Builds an expression tree from LeetCode's level-order array format, where
 * `null` marks a missing child.
 *
 * @example
 * expressionTreeFromArray(["+", "1", "2"])?.left?.val; // "1"
 */
export const expressionTreeFromArray = (
	values: readonly (string | null)[],
): ExpressionTreeNode | null => {
	const [rootValue] = values;
	if (rootValue === undefined || rootValue === null) return null;
	const root = new ExpressionTreeNode(rootValue);
	const queue = [root];
	let next = 1;
	for (let head = 0; head < queue.length && next < values.length; head++) {
		const node = queue[head];
		if (!node) break;
		const left = values[next++];
		if (left !== undefined && left !== null) {
			node.left = new ExpressionTreeNode(left);
			queue.push(node.left);
		}
		const right = values[next++];
		if (right !== undefined && right !== null) {
			node.right = new ExpressionTreeNode(right);
			queue.push(node.right);
		}
	}
	return root;
};

/**
 * Converts an expression tree into LeetCode's level-order array format,
 * without trailing `null`s.
 *
 * @example
 * expressionTreeToArray(expressionTreeFromArray(["+", "1", "2"])); // ["+", "1", "2"]
 */
export const expressionTreeToArray = (
	root: ExpressionTreeNode | null,
): (string | null)[] => {
	const values: (string | null)[] = [];
	const queue: (ExpressionTreeNode | null)[] = [root];
	for (let head = 0; head < queue.length; head++) {
		const node = queue[head];
		if (node) {
			values.push(node.val);
			queue.push(node.left, node.right);
		} else {
			values.push(null);
		}
	}
	while (values.at(-1) === null) values.pop();
	return values;
};
