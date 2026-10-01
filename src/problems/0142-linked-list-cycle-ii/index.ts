import type { ListNode } from "../../structures/list-node";

/**
 * 142. Linked List Cycle II
 *
 * Returns the node where a linked list's cycle begins, or `null` if it has
 * no cycle. The list is not modified.
 *
 * Floyd's cycle detection finds a meeting point inside the cycle. The
 * distance from the head to the cycle's start equals the distance from the
 * meeting point onwards to the start, modulo the cycle length, so two
 * pointers moving one step at a time from the head and the meeting point
 * meet at the start.
 *
 * @see https://leetcode.com/problems/linked-list-cycle-ii/
 * @difficulty Medium
 * @timeComplexity O(n)
 * @spaceComplexity O(1)
 *
 * @example
 * linkedListCycleII(head); // the node the tail links back to, or null
 */
export const linkedListCycleII = (head: ListNode | null): ListNode | null => {
	let slow = head;
	let fast = head;

	while (fast?.next) {
		slow = slow?.next ?? null;
		fast = fast.next.next;

		if (slow === fast) {
			let fromHead = head;
			while (fromHead !== slow) {
				fromHead = fromHead?.next ?? null;
				slow = slow?.next ?? null;
			}
			return fromHead;
		}
	}

	return null;
};
