import type { ListNode } from "../../structures/list-node";
import { TreeNode } from "../../structures/tree-node";

/**
 * 109. Convert Sorted List to Binary Search Tree
 *
 * Builds a height-balanced binary search tree from a linked list sorted in
 * ascending order. In a height-balanced tree, the depths of every node's two
 * subtrees differ by at most one.
 *
 * Counts the nodes, then builds the tree in inorder: the left half of each
 * range first, then its middle node (which is always the next list node),
 * then the right half. This reads the list once, front to back, without
 * searching for middles.
 *
 * @see https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(log n) excluding the returned tree
 *
 * @example
 * convertSortedListToBinarySearchTree(listFromArray([-10, -3, 0, 5, 9])); // a tree like [0, -3, 9, -10, null, 5]
 */
export const convertSortedListToBinarySearchTree = (
	head: ListNode | null,
): TreeNode | null => {
	let length = 0;
	for (let node = head; node !== null; node = node.next) length++;

	let current = head;
	const build = (low: number, high: number): TreeNode | null => {
		if (low > high) return null;
		const mid = Math.floor((low + high) / 2);
		const left = build(low, mid - 1);
		const root = new TreeNode(current?.val ?? 0, left);
		current = current?.next ?? null;
		root.right = build(mid + 1, high);
		return root;
	};

	return build(0, length - 1);
};
