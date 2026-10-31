import type { ListNode } from "../../structures/list-node";

/**
 * 2674. Split a Circular Linked List
 *
 * Splits a circular linked list into two circular lists: the first half,
 * taking the extra node when the length is odd, and the rest. Returns
 * both heads.
 *
 * Walk a fast and a slow pointer to find the end of the first half, then
 * relink both halves into circles.
 *
 * @see https://leetcode.com/problems/split-a-circular-linked-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * splitACircularLinkedList(circular([2, 6, 1, 5])); // circles [2, 6] and [1, 5]
 */
export const splitACircularLinkedList = (
	list: ListNode | null,
): (ListNode | null)[] => {
	if (!list) return [null, null];
	let slow = list;
	let fast = list;
	while (fast.next !== list && fast.next?.next !== list) {
		slow = slow.next ?? list;
		fast = fast.next?.next ?? list;
	}
	const last = fast.next === list ? fast : (fast.next ?? list);
	const second = slow.next === list ? null : slow.next;
	slow.next = list;
	if (second) last.next = second;
	return [list, second];
};
