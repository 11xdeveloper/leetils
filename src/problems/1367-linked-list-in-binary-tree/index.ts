import type { ListNode } from "../../structures/list-node";
import type { TreeNode } from "../../structures/tree-node";

/**
 * 1367. Linked List in Binary Tree
 *
 * Returns whether the values of the linked list appear, in order, along
 * some downward path of the binary tree.
 *
 * Knuth–Morris–Pratt over tree paths: builds the failure table for the
 * list's values, then walks the tree with an explicit stack, carrying how
 * much of the list the path so far matches. Each node advances that match
 * as KMP would, so the whole search is linear.
 *
 * @see https://leetcode.com/problems/linked-list-in-binary-tree/
 * @difficulty Medium
 * @timeComplexity O(n + m)
 * @spaceComplexity O(n + m)
 *
 * @example
 * linkedListInBinaryTree(listFromArray([4, 2, 8]), treeFromArray([1, 4, 4, null, 2, 2, null, 1, null, 6, 8, null, null, null, null, 1, 3])); // true
 */
export const linkedListInBinaryTree = (
	head: ListNode | null,
	root: TreeNode | null,
): boolean => {
	const pattern: number[] = [];
	for (let node = head; node; node = node.next) pattern.push(node.val);
	if (pattern.length === 0) return true;
	const failure = new Array<number>(pattern.length).fill(0);
	for (let i = 1, k = 0; i < pattern.length; i++) {
		while (k > 0 && pattern[i] !== pattern[k]) k = failure[k - 1] ?? 0;
		if (pattern[i] === pattern[k]) k++;
		failure[i] = k;
	}
	const stack: [TreeNode, number][] = root ? [[root, 0]] : [];
	for (let item = stack.pop(); item; item = stack.pop()) {
		const [node, matchedBefore] = item;
		let matched = matchedBefore;
		while (matched > 0 && node.val !== pattern[matched])
			matched = failure[matched - 1] ?? 0;
		if (node.val === pattern[matched]) matched++;
		if (matched === pattern.length) return true;
		if (node.left) stack.push([node.left, matched]);
		if (node.right) stack.push([node.right, matched]);
	}
	return false;
};
