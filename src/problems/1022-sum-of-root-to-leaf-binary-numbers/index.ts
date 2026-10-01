import type { TreeNode } from "../../structures/tree-node";

/**
 * 1022. Sum of Root To Leaf Binary Numbers
 *
 * Each node holds a bit, and each root-to-leaf path spells a binary number
 * (the root is the most significant bit). Returns the sum of those numbers.
 *
 * Carries each path's value down with an explicit stack, doubling and
 * adding the bit at each node, and sums the values at the leaves.
 *
 * @see https://leetcode.com/problems/sum-of-root-to-leaf-binary-numbers/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * sumOfRootToLeafBinaryNumbers(treeFromArray([1, 0, 1, 0, 1, 0, 1])); // 22
 */
export const sumOfRootToLeafBinaryNumbers = (root: TreeNode | null): number => {
	let total = 0;
	const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, above] = item;
		const value = above * 2 + node.val;
		if (!node.left && !node.right) total += value;
		if (node.left) stack.push([node.left, value]);
		if (node.right) stack.push([node.right, value]);
	}
	return total;
};
