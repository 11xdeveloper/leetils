import type { ListNode } from "../../structures/list-node";

/**
 * 141. Linked List Cycle
 *
 * Returns whether a linked list has a cycle: a node whose `next` pointer
 * leads back to an earlier node.
 *
 * Floyd's cycle detection: a slow pointer moves one node at a time and a
 * fast pointer two. In a cycle the fast pointer catches up with the slow
 * one; otherwise it reaches the end.
 *
 * @see https://leetcode.com/problems/linked-list-cycle/
 * @difficulty Easy
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * linkedListCycle(head); // true if following next pointers never reaches null
 */
export const linkedListCycle = (head: ListNode | null): boolean => {
	let slow = head;
	let fast = head;

	while (fast?.next) {
		slow = slow?.next ?? null;
		fast = fast.next.next;
		if (slow === fast) return true;
	}

	return false;
};
