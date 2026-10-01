import { ListNode } from "../../structures/list-node";

/**
 * 369. Plus One Linked List
 *
 * Adds one to a non-negative integer stored as a linked list of digits,
 * most significant first, and returns the head. The digits are updated in
 * place.
 *
 * Only the digits after the last non-9 digit change: that digit goes up by
 * one and the 9s after it become 0. If every digit is 9, a new 1 goes in
 * front.
 *
 * @see https://leetcode.com/problems/plus-one-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * plusOneLinkedList(listFromArray([1, 2, 9])); // 1 -> 3 -> 0
 */
export const plusOneLinkedList = (head: ListNode | null): ListNode | null => {
	const dummy = new ListNode(0, head);
	let lastNotNine = dummy;
	for (let node = head; node; node = node.next)
		if (node.val !== 9) lastNotNine = node;

	lastNotNine.val++;
	for (let node = lastNotNine.next; node; node = node.next) node.val = 0;

	return dummy.val === 1 ? dummy : head;
};
