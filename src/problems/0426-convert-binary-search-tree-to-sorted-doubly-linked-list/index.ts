import type { TreeNode } from "../../structures/tree-node";

/**
 * 426. Convert Binary Search Tree to Sorted Doubly Linked List
 *
 * Rearranges a binary search tree, in place, as the problem requires, into a
 * sorted circular doubly linked list: each node's `left` points to its
 * predecessor and `right` to its successor, with the ends joined. Returns
 * the smallest node, or `null` for an empty tree.
 *
 * An inorder traversal visits the nodes in sorted order, so it links each
 * node to the one visited before it, then joins the last to the first. It
 * uses an explicit stack, so deep trees can't overflow the call stack.
 *
 * @see https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(h) where h is the height of the tree
 *
 * @example
 * convertBinarySearchTreeToSortedDoublyLinkedList(treeFromArray([4, 2, 5, 1, 3])); // 1 ⇄ 2 ⇄ 3 ⇄ 4 ⇄ 5, circular
 */
export const convertBinarySearchTreeToSortedDoublyLinkedList = (
	root: TreeNode | null,
): TreeNode | null => {
	let first: TreeNode | null = null;
	let previous: TreeNode | null = null;
	const stack: TreeNode[] = [];

	for (let node = root; node || stack.length > 0; ) {
		while (node) {
			stack.push(node);
			node = node.left;
		}
		const current = stack.pop();
		if (!current) break;
		// Read the right child before its pointer is reused for the list.
		node = current.right;

		if (previous) {
			previous.right = current;
			current.left = previous;
		} else {
			first = current;
		}
		previous = current;
	}

	if (first && previous) {
		first.left = previous;
		previous.right = first;
	}
	return first;
};
