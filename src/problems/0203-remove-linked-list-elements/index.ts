import { ListNode } from "../../structures/list-node";

/**
 * 203. Remove Linked List Elements
 *
 * Removes every node with value `val` from a linked list and returns the
 * head. The nodes are relinked, so the input list is modified.
 *
 * Walks the list from a dummy node before the head, unlinking each matching
 * node, so removing the head needs no special case.
 *
 * @see https://leetcode.com/problems/remove-linked-list-elements/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * removeLinkedListElements(listFromArray([1, 2, 6, 3, 4, 5, 6]), 6); // 1 -> 2 -> 3 -> 4 -> 5
 */
export const removeLinkedListElements = (
	head: ListNode | null,
	val: number,
): ListNode | null => {
	const dummy = new ListNode(0, head);

	for (let node = dummy; node.next; ) {
		if (node.next.val === val) node.next = node.next.next;
		else node = node.next;
	}

	return dummy.next;
};
