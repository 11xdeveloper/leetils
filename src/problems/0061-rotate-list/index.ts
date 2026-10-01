import type { ListNode } from "../../structures/list-node";

/**
 * 61. Rotate List
 *
 * Rotates a linked list to the right by `k` places and returns its new head.
 * The nodes are relinked, so the input list is modified.
 *
 * Only `k` modulo the length matters. Joins the tail to the head to make a
 * ring, then breaks it `length - k` nodes from the old head.
 *
 * @see https://leetcode.com/problems/rotate-list/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * rotateList(listFromArray([1, 2, 3, 4, 5]), 2); // 4 -> 5 -> 1 -> 2 -> 3
 */
export const rotateList = (
	head: ListNode | null,
	k: number,
): ListNode | null => {
	if (head === null) return null;

	let length = 1;
	let tail = head;
	while (tail.next !== null) {
		tail = tail.next;
		length++;
	}

	const steps = k % length;
	if (steps === 0) return head;

	let newTail = head;
	for (let i = 1; i < length - steps; i++) newTail = newTail.next ?? newTail;

	const newHead = newTail.next;
	newTail.next = null;
	tail.next = head;
	return newHead;
};
