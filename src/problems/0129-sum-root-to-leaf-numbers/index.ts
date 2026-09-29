import type { TreeNode } from "../../structures/tree-node";

/**
 * 129. Sum Root to Leaf Numbers
 *
 * In a binary tree of digits, each path from the root down to a leaf spells
 * a number, like 1 → 2 → 3 spelling 123. Returns the sum of those numbers.
 *
 * Depth-first search with an explicit stack of nodes and the numbers spelled
 * on the way to them, adding each leaf's number to the total.
 *
 * @see https://leetcode.com/problems/sum-root-to-leaf-numbers/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * sumRootToLeafNumbers(treeFromArray([1, 2, 3])); // 25, from 12 + 13
 */
export const sumRootToLeafNumbers = (root: TreeNode | null): number => {
	const stack: [TreeNode, number][] = root ? [[root, root.val]] : [];
	let total = 0;

	for (let entry = stack.pop(); entry; entry = stack.pop()) {
		const [node, number] = entry;
		if (!node.left && !node.right) total += number;
		if (node.right) stack.push([node.right, number * 10 + node.right.val]);
		if (node.left) stack.push([node.left, number * 10 + node.left.val]);
	}

	return total;
};
