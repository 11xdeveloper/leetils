import type { TreeNode } from "../../structures/tree-node";

/**
 * 1315. Sum of Nodes with Even-Valued Grandparent
 *
 * Returns the sum of the values of nodes whose grandparent has an even
 * value.
 *
 * Walks the tree with an explicit stack, passing each node its parent's
 * and grandparent's values.
 *
 * @see https://leetcode.com/problems/sum-of-nodes-with-even-valued-grandparent/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfNodesWithEvenValuedGrandparent(treeFromArray([6, 7, 8, 2, 7, 1, 3, 9, null, 1, 4, null, null, null, 5])); // 18
 */
export const sumOfNodesWithEvenValuedGrandparent = (
	root: TreeNode | null,
): number => {
	let sum = 0;
	// Each entry holds a node with its parent's and grandparent's values (1 when absent).
	const stack: [TreeNode, number, number][] = root ? [[root, 1, 1]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, parent, grandparent] = item;
		if (grandparent % 2 === 0) sum += node.val;
		if (node.left) stack.push([node.left, node.val, parent]);
		if (node.right) stack.push([node.right, node.val, parent]);
	}
	return sum;
};
