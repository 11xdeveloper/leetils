import type { ListNode } from "../../structures/list-node";

/**
 * 206. Reverse Linked List
 *
 * Reverses a linked list and returns its new head. The nodes are relinked,
 * so the input list is modified.
 *
 * Walks the list once, pointing each node back at the one before it.
 *
 * @see https://leetcode.com/problems/reverse-linked-list/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * reverseLinkedList(listFromArray([1, 2, 3, 4, 5])); // 5 -> 4 -> 3 -> 2 -> 1
 */
export const reverseLinkedList = (head: ListNode | null): ListNode | null => {
	let reversed: ListNode | null = null;
	let node = head;

	while (node) {
		const next: ListNode | null = node.next;
		node.next = reversed;
		reversed = node;
		node = next;
	}

	return reversed;
};
