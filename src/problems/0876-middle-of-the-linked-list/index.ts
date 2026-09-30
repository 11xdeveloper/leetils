import type { ListNode } from "../../structures/list-node";

/**
 * 876. Middle of the Linked List
 *
 * Returns the middle node of a linked list, the second of the two middle
 * nodes when the length is even.
 *
 * A fast pointer moves two nodes for each one the slow pointer moves, so
 * the slow one is at the middle when the fast one runs out.
 *
 * @see https://leetcode.com/problems/middle-of-the-linked-list/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * listToArray(middleOfTheLinkedList(listFromArray([1, 2, 3, 4, 5, 6]))); // [4, 5, 6]
 */
export const middleOfTheLinkedList = (
	head: ListNode | null,
): ListNode | null => {
	let slow = head;
	for (let fast = head; fast?.next; fast = fast.next.next)
		slow = slow?.next ?? null;
	return slow;
};
