import type { ListNode } from "../../structures/list-node";

/**
 * 1474. Delete N Nodes After M Nodes of a Linked List
 *
 * Repeatedly keeps `m` nodes then removes the next `n`, in place, and
 * returns the head.
 *
 * Walks the list, skipping past each kept block and relinking its last node
 * past the removed block.
 *
 * @see https://leetcode.com/problems/delete-n-nodes-after-m-nodes-of-a-linked-list/
 * @difficulty Easy
 * @timeComplexity O(length)
 * @spaceComplexity O(1)
 *
 * @example
 * listToArray(deleteNNodesAfterMNodesOfALinkedList(listFromArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]), 1, 3)); // [1, 5, 9]
 */
export const deleteNNodesAfterMNodesOfALinkedList = (
	head: ListNode | null,
	m: number,
	n: number,
): ListNode | null => {
	let node = head;
	while (node) {
		for (let kept = 1; kept < m && node; kept++) node = node.next;
		if (!node) break;
		let after = node.next;
		for (let removed = 0; removed < n && after; removed++) after = after.next;
		node.next = after;
		node = after;
	}
	return head;
};
