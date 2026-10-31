import type { ListNode } from "../../structures/list-node";

/**
 * 2046. Sort Linked List Already Sorted Using Absolute Values
 *
 * Sorts a linked list that is sorted by absolute value into ascending
 * order, returning the new head.
 *
 * Negative values appear in decreasing order, so moving each one to the
 * front, in turn, sorts them.
 *
 * @see https://leetcode.com/problems/sort-linked-list-already-sorted-using-absolute-values/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * sortLinkedListAlreadySortedUsingAbsoluteValues(listFromArray([0, 2, -5, 5, 10, -10])); // -10 -> -5 -> 0 -> 2 -> 5 -> 10
 */
export const sortLinkedListAlreadySortedUsingAbsoluteValues = (
	head: ListNode | null,
): ListNode | null => {
	let previous = head;
	let node = head?.next ?? null;
	while (previous && node) {
		if (node.val < 0) {
			previous.next = node.next;
			node.next = head;
			head = node;
		} else {
			previous = node;
		}
		node = previous.next;
	}
	return head;
};
