import type { ListNode } from "../../structures/list-node";

/**
 * 237. Delete Node in a Linked List
 *
 * Deletes `node` from its linked list, in place, given only that node and
 * not the head. The node is never the last one.
 *
 * Without the previous node, `node` itself can't be unlinked. Instead it
 * takes on the next node's value and unlinks the next node, which has the
 * same effect on the list's values.
 *
 * @see https://leetcode.com/problems/delete-node-in-a-linked-list/
 * @difficulty Medium
 * @timeComplexity O(1)
 * @spaceComplexity O(1)
 *
 * @example
 * const head = listFromArray([4, 5, 1, 9]);
 * deleteNodeInALinkedList(head.next); // the list is now 4 -> 1 -> 9
 */
export const deleteNodeInALinkedList = (node: ListNode): void => {
	const next = node.next;
	if (!next) return;
	node.val = next.val;
	node.next = next.next;
};
