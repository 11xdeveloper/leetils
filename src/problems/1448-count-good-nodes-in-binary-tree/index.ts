import type { TreeNode } from "../../structures/tree-node";

/**
 * 1448. Count Good Nodes in Binary Tree
 *
 * A node is good if nothing on the path from the root to it is larger.
 * Returns how many good nodes there are.
 *
 * Walks the tree with an explicit stack, passing down the largest value
 * seen on the path.
 *
 * @see https://leetcode.com/problems/count-good-nodes-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(n)
 *
 * @example
 * countGoodNodesInBinaryTree(treeFromArray([3, 1, 4, 3, null, 1, 5])); // 4
 */
export const countGoodNodesInBinaryTree = (root: TreeNode | null): number => {
	let good = 0;
	const stack: [TreeNode, number][] = root ? [[root, -Infinity]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, largest] = item;
		if (node.val >= largest) good++;
		const next = Math.max(largest, node.val);
		if (node.left) stack.push([node.left, next]);
		if (node.right) stack.push([node.right, next]);
	}
	return good;
};
