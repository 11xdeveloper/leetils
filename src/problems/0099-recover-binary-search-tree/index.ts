import type { TreeNode } from "../../structures/tree-node";

/**
 * 99. Recover Binary Search Tree
 *
 * Fixes a binary search tree in which exactly two nodes' values were
 * swapped, by swapping them back, in place, as the problem requires.
 *
 * In an inorder traversal of the tree, the swapped values show up as one or
 * two places where a value is larger than the one after it. Uses a Morris
 * traversal, which threads temporary links back to each node's inorder
 * successor instead of using a stack, so it needs only constant extra space.
 * The links are removed as it goes, leaving the tree's shape unchanged.
 *
 * @see https://leetcode.com/problems/recover-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * const root = treeFromArray([1, 3, null, null, 2]);
 * recoverBinarySearchTree(root); // root is now [3, 1, null, null, 2]
 */
export const recoverBinarySearchTree = (root: TreeNode | null): void => {
	const found: {
		first: TreeNode | null;
		second: TreeNode | null;
		previous: TreeNode | null;
	} = { first: null, second: null, previous: null };

	const visit = (node: TreeNode): void => {
		if (found.previous && found.previous.val > node.val) {
			found.first ??= found.previous;
			found.second = node;
		}
		found.previous = node;
	};

	let node = root;
	while (node) {
		if (!node.left) {
			visit(node);
			node = node.right;
			continue;
		}

		// Find the rightmost node of the left subtree: node's predecessor.
		let predecessor = node.left;
		while (predecessor.right && predecessor.right !== node) {
			predecessor = predecessor.right;
		}

		if (predecessor.right === node) {
			// The left subtree is done: remove the thread and visit node.
			predecessor.right = null;
			visit(node);
			node = node.right;
		} else {
			// Thread the predecessor back to node, then go left.
			predecessor.right = node;
			node = node.left;
		}
	}

	const { first, second } = found;
	if (first && second) {
		[first.val, second.val] = [second.val, first.val];
	}
};
