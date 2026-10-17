import type { ListNode } from "../../structures/list-node";

/**
 * 2095. Delete the Middle Node of a Linked List
 *
 * Deletes the node at index `⌊n / 2⌋` of a linked list and returns the
 * head.
 *
 * Move a fast pointer two steps for each step of a slow one that starts a
 * node behind, so the slow one stops just before the middle.
 *
 * @see https://leetcode.com/problems/delete-the-middle-node-of-a-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * deleteTheMiddleNodeOfALinkedList(listFromArray([1, 3, 4, 7, 1, 2, 6])); // 1 -> 3 -> 4 -> 1 -> 2 -> 6
 */
export const deleteTheMiddleNodeOfALinkedList = (
	head: ListNode | null,
): ListNode | null => {
	if (!head?.next) return null;
	let slow = head;
	for (let fast = head.next.next; fast?.next; fast = fast.next.next) {
		if (slow.next) slow = slow.next;
	}
	slow.next = slow.next?.next ?? null;
	return head;
};
