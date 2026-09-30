import { TreeNode } from "../../structures/tree-node";

/**
 * 897. Increasing Order Search Tree
 *
 * Rearranges a binary search tree so its nodes form a chain in increasing
 * order: each node has no left child and its right child is the next
 * larger. The nodes are relinked in place; the new root is returned.
 *
 * An inorder traversal with an explicit stack visits the nodes in order,
 * appending each to the chain.
 *
 * @see https://leetcode.com/problems/increasing-order-search-tree/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * treeToArray(increasingOrderSearchTree(treeFromArray([5, 1, 7]))); // [1, null, 5, null, 7]
 */
export const increasingOrderSearchTree = (
	root: TreeNode | null,
): TreeNode | null => {
	const head = new TreeNode();
	let tail = head;
	const stack: TreeNode[] = [];
	for (let node = root; node || stack.length > 0; ) {
		for (; node; node = node.left) stack.push(node);
		const current = stack.pop();
		if (!current) break;
		node = current.right;
		current.left = null;
		tail.right = current;
		tail = current;
	}
	return head.right;
};
